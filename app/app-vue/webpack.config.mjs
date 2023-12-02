import { resolve } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	mode: 'development',
	entry: './packages/core/index.mjs',
	output: {
		filename: 'main.js',
		path: resolve(__dirname, 'dist')
	}
};

// npx webpack --config webpack.config.mjs
