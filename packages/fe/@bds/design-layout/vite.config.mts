import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import { vitestConfig } from '@bds/vitest-config/frontend';


export default mergeConfig(
    defineConfig({
        plugins: [
            react(),
            svgr({
                svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
                include: "**/*.svg",
            }),
        ],
        resolve: {
            alias: {
                '@bds/design-layout': resolve(__dirname, 'src'),
                lodash: 'lodash-es',
            },
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src', 'index.ts'),
                name: 'BdsDesignLayout',
                fileName: (format) => `bds-design-layout.${format}.js`,
            },
            rollupOptions: {
                external: ['react', 'react-dom'], 
                output: {
                    exports: 'named',
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
    }),
    vitestConfig,
);
