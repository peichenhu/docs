import { defineConfig } from "vitepress";
import viteConfig from "./config.vite.mjs";
import vueConfig from "./config.vue.mjs";
// import MENU from "./config-menu.json";
import { createMenu } from "./utils/sidebar.mjs";
const MENU = createMenu();
const VERSION = process.env.npm_package_version;

// https://vitepress.dev/reference/site-config
export default defineConfig({
    vite: viteConfig,
    vue: vueConfig,
    appearance: "dark",
    // base: "/blog/",
    outDir: "../dist",
    title: "PCH1024",
    description: "PCH1024 的备忘录",
    rewrites: {
        // 'source/:page': 'destination/:page'
    },
    head: [
        ["meta", { name: "theme-color", content: "#0f00ee" }],
        ["link", { rel: "icon", href: "/blog/logo.svg" }],
    ],
    themeConfig: {
        lastUpdated: true,
        lastUpdatedText: "最近写作时间",
        outline: "deep",
        outlineTitle: "本页章节",
        markdown: {
            lineNumbers: true,
        },
        editLink: {
            pattern: ({ filePath }) => {
                return `https://github.com/peichenhu/blog/edit/main/src/${filePath}`;
            },
        },
        search: {
            provider: "local",
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "RunJS", link: "https://poe.com/" },
            { text: "POE-AI", link: "https://poe.com/" },
            { text: "背单词", link: "https://fanyi.baidu.com/collection" },
            {
                text: "切换",
                items: [
                    {
                        text: "GITHUB 托管",
                        link: "https://git.peichenhu.cn/blog",
                    },
                    { text: "百度云托管", link: "https://120.48.97.59/blog/" },
                ],
            },
        ],
        sidebar: [
            ...MENU,
            {
                text: "网站导航",
                items: [
                    { text: "内部导航", link: "/home#内部导航" },
                    { text: "外部导航", link: "/home#外部导航" },
                    { text: "api-examples", link: "/api-examples" },
                    { text: "markdown-examples", link: "/markdown-examples" },
                ],
            },
        ],
        footer: {
            /* prettier-ignore */
            message: " ༼ つ/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿◕ _◕ ༽つ/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿",
            copyright: "COPYRIGHT © 1992-PRESENT PCH1024-V" + VERSION,
        },
        socialLinks: [{ icon: "github", link: "https://github.com/peichenhu" }],
    },
});
