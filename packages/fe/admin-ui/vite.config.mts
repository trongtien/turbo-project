import { posix as pathPosix, resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from "vite-plugin-svgr";
import fs from 'fs'

import { vitestConfig } from '@bds/vitest-config/frontend';
import icons from 'unplugin-icons/vite';

import browserslistToEsbuild from 'browserslist-to-esbuild';
import legacy from '@vitejs/plugin-legacy';
import browserslist from 'browserslist';

const publicPath = process.env.VITE_APP_PUBLIC_PATH || '/';
const packagesDir = resolve(__dirname, '..', '..');

const { NODE_ENV } = process.env;

const browsers = browserslist.loadConfig({ path: process.cwd() });

const alias = [
    { find: '@admin-ui', replacement: resolve(__dirname, 'src') },
    {
        find: /^@bds\/theme(.+)$/,
        replacement: resolve(packagesDir, 'fe', '@bds', 'theme$1'),
    },
    ...['orderBy', 'camelCase', 'cloneDeep', 'startCase'].map((name) => ({
        find: new RegExp(`^lodash.${name}$`, 'i'),
        replacement: `lodash-es/${name}`,
    })),
    {
        find: /^lodash\.(.+)$/,
        replacement: 'lodash-es/$1',
    },
];


function getWasmPath(relativePath: string): string | null {
    const possiblePaths = [
        resolve(__dirname, 'node_modules', relativePath),
        resolve(__dirname, '..', '..', 'node_modules', relativePath),
        resolve(__dirname, '..', '..', '..', 'node_modules', relativePath)
    ];

    for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
            console.log(`Found WASM file at: ${path}`);
            // Convert Windows path to POSIX style for vite-plugin-static-copy
            return pathPosix.normalize(path.split('\\').join('/'));
        }
    }
    console.warn(`WASM file not found: ${relativePath}`);
    return null;
}


const plugins = [
    icons({
        compiler: 'jsx',
        autoInstall: true,
    }),
    viteStaticCopy({
        targets: [
            {
                src: getWasmPath('curlconverter/dist/tree-sitter-bash.wasm'),
                dest: 'dist',
                failOnMissing: false
            },
            {
                src: getWasmPath('web-tree-sitter/tree-sitter.wasm'),
                dest: 'dist',
                failOnMissing: false
            }
        ].filter(target => target.src !== null && target.src !== '') as any[]
    }),
    react(),
    svgr({
        svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
        include: "**/*.svg",
    }),
    legacy({
        modernTargets: browsers,
        modernPolyfills: true,
        renderLegacyChunks: false,
    }),
];

const { RELEASE: release } = process.env;
const target = browserslistToEsbuild(browsers);

export default mergeConfig(
    defineConfig({
        define: {
            // This causes test to fail but is required for actually running it
            ...(NODE_ENV === 'development' ? { 'process.env': {} } : {}),
            BASE_PATH: `'${publicPath}'`,
        },
        plugins,
        resolve: { alias },
        base: publicPath,
        envPrefix: 'VITE_',
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        '',
                        '@use "@bds/theme/bds-theme-variables.scss" as *;',
                        // '@use "@n8n/design-system/css/mixins" as mixins;',
                    ].join('\n'),
                },
            },
        },
        build: {
            minify: !!release,
            sourcemap: !!release,
            target,

        },
        optimizeDeps: {
            esbuildOptions: {
                target,
            },
        },
        worker: {
            format: 'es',
        },
    }),
    vitestConfig,
);
