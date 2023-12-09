import { defineConfig } from 'vite';
// import webpack from 'webpack';
// import swc from '@rollup/plugin-swc';
// import sucrase from '@rollup/plugin-sucrase';
// import resolve from '@rollup/plugin-node-resolve';

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')

export default defineConfig({
	build: {
		// minify: 'terser',
		// cssMinify: 'lightningcss',
		rollupOptions: {
			// cache: true,
			output: {
				// manualChunks: {}
			},
			plugins: [
				// swc(),
				// resolve({
				// 	extensions: ['.js', 'mjs', '.ts']
				// }),
				// sucrase({
				// 	exclude: ['node_modules/**'],
				// 	transforms: ['typescript']
				// })
			]
		}
	}
});
