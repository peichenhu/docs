import { defineConfig } from "vite";

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {},
            },
        },
    },
});
