import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { vitestConfig } from '@bds/vitest-config/frontend';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';

const packagesDir = resolve(__dirname, '..', '..', '..');
export default mergeConfig(
	defineConfig({
		plugins: [
			tailwindcss(),
			react(),
			svgr({
				svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
				include: '**/*.svg',
			}),
			dts({
				include: ['src'],
				exclude: ['**/*.test.ts', '**/*.test.tsx'],
			}),
		],
		resolve: {
			alias: {
				'lodash-es': resolve(__dirname, '../../node_modules/lodash-es'),
				'@bds/design-layout': resolve(__dirname, 'src'),
				lodash: 'lodash-es',
				'@bds/theme(.*)': resolve(packagesDir, 'fe', '@bds', 'theme$1'),
			},
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
				generateScopedName: '[name]__[local]___[hash:base64:5]',
			},
			preprocessorOptions: {
				scss: {
					additionalData: ['', '@use "@bds/theme/bds-theme-variables.scss" as *;'].join('\n'),
				},
			},
		},
		build: {
			lib: {
				entry: resolve(__dirname, 'src', 'index.ts'),
				name: 'BdsDesignLayout',
				fileName: (format) => `bds-design-layout.${format}.js`,
			},
			rollupOptions: {
				external: [
					'react',
					'react-dom',
					'react/jsx-runtime',
					/^lodash-es/,
					/^@radix-ui\/.*/,
					'recharts',
				],
				output: {
					exports: 'named',
					assetFileNames: 'style-design-layout.css',
					preserveModules: true,
					preserveModulesRoot: 'src',
				},
			},
		},
	}),
	vitestConfig,
);
