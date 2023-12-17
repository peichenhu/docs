import DefaultTheme from 'vitepress/theme-without-fonts';
import './custom.css';

export default {
	extends: DefaultTheme,
	async enhanceApp({ app }) {
		// runWorker();
		console.log('enhanceApp', app);
	}
};
