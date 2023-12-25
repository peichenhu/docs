import DefaultTheme from 'vitepress/theme-without-fonts';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './custom.css';

export default {
	extends: DefaultTheme,
	async enhanceApp({ app }) {
		app.use(ElementPlus);
	}
};
