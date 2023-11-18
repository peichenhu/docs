"use strict";

module.exports = {
  dest: "dist",
  title: "加里敦",
  description: "事必躬亲，牢记于心",
  head: [["link", {
    rel: "icon",
    href: "/assets/img/favicon.ico"
  }], ["script", {
    src: "https://beautifier.io/js/lib/beautifier.min.js"
  }], ["script", null, "\n                var _hmt = _hmt || [];\n                (function() {\n                var hm = document.createElement(\"script\");\n                hm.src = \"https://hm.baidu.com/hm.js?11ee3eaf406620d405bb85e0f32425c7\";\n                var s = document.getElementsByTagName(\"script\")[0]; \n                s.parentNode.insertBefore(hm, s);\n                })();\n            "]],
  configureWebpack: {
    resolve: {
      alias: {
        "@": "/assets/img"
      }
    }
  },
  themeConfig: {
    sidebarDepth: 1,
    displayAllHeaders: false,
    // 默认值：false
    sidebar: [{
      title: "学习 JS",
      children: ["/1-JS/1-变量", "/1-JS/2-函数", "/1-JS/3-执行环境", "/1-JS/理解原型对象", "/1-JS/事件循环机制", "/1-JS/垃圾清理机制", "/1-JS/模块编程机制", "/1-JS/异步编程机制", "/1-JS/JS-面向对象编程", "/1-JS/JS-柯里化函数", "/1-JS/JS-代理和反射", "/1-JS/JS手写Polyfill", "/1-JS/JS百宝箱"]
    }, {
      title: "学习 Vue",
      children: ["/2-Vue/Vue", "/2-Vue/Vuex", "/2-Vue/VueRouter" // "/2-学习Vue/Vite",
      // "/2-学习Vue/Vue3",
      // "/2-学习Vue/Vue高阶组件",
      ]
    }, {
      title: "学习 HTML&CSS",
      children: ["/3-HTML&CSS/CSS" //
      ]
    }, {
      title: "学习 Browser",
      children: ["/4-Browser/页面加载", "/4-Browser/控制台", "/4-Browser/重绘与回流", "/4-Browser/安全防护", "/4-Browser/跨域", "/4-Browser/HTTP" // "/3-Browser/存储",
      // "/3-Browser/网络请求",
      // "/3-Browser/页面通信",
      // "/3-Browser/进程和线程",
      ]
    }, {
      title: "学习 LeetCode",
      children: ["/5-LeetCode/亿题.md", "/5-LeetCode/链表.md", "/5-LeetCode/正则.md", "/5-LeetCode/克隆.md", "/5-LeetCode/排序.md", "/5-LeetCode/深度&广度优先.md" //
      ]
    }, {
      title: "学习 Pattern",
      children: ["/8-Pattern/策略模式.md", "/8-Pattern/单例模式.md", "/8-Pattern/观察者模式.md", "/8-Pattern/发布订阅模式.md" //
      ]
    }, {
      title: "学习 build",
      children: ["/7-Building/building.md", "/7-Building/webpack.md", "/7-Building/rollup.md" //
      ]
    }, {
      title: "杂货铺",
      children: ["/生活打卡", "/9-Other/个人简历", "/9-Other/个人租房", "/9-Other/资源导航", "/9-Other/日常问题", // "/9-Other/个人规划",
      "/9-Other/Markdown语法", "/9-Other/芸芸众生", "/9-Other/Emoji", "/9-Other/墙外的世界", "/9-Other/未整理的知识" // "/9-Other/面试记录",
      //
      //
      ]
    }],
    nav: [// { text: "我的思否", link: "https://segmentfault.com/u/peichenhu" },
    // { text: "在线 HTML", link: "/VueEditor" },
    {
      text: "生活打卡",
      link: "/生活打卡"
    }, {
      text: "关于我",
      link: "/9-Other/个人简历"
    }, {
      text: "日常问题",
      link: "/9-Other/日常问题"
    }, {
      text: "Todo",
      link: "/websiteList/TodoList/index.html"
    }, {
      text: "Github",
      link: "https://github.com/pch1024"
    }]
  },
  markdown: {
    lineNumbers: true
  }
};