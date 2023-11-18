# 前端工程化

根据已有知识去构想前端工程化

```
0. 基于 node + esm + npm

1. 构建
要满足不同的 JS 框架
要能够处理所有的资源类型
要支持自定义扩展插件
要能够输出多种规范的包
符合要求的有 webpack、rollup

```

## 环境区分

-   仅支持 `node` 环境的工具

    1. 不能使用 `BOM` 的对象。
    2. 不能使用 `window` 对象。
    3. 不能输出 `IIFE`、`UMD` 规范包。
    4. 只能输出 `CJS`、`ESM` 规范包。

-   仅支持 `browser` 环境的工具

    1. 不得使用 `node source` 包依赖。
    2. 支持浏览器平台 或者 通过 `Polyfill` 支持浏览器平台。
    3. 只能输出 `IIFE`、`UMD` 规范包。
    4. 不能输出 `CJS`、`ESM` 规范包。

-   `node + browser` 全环境工具型

    1.  适合 `纯工具型` 或者 `双平台 Polyfill 支持完备型` 的工具.
    2.  支持输出 `CJS`、`ESM`、`IIFE`、`UMD` 规范包.

## `#!/usr/bin node` 和 `#!/usr/bin/env node` 两者的区别

`#!/usr/bin node` 是告诉操作系统执行这个脚本的时候，调用/usr/bin 下的 node 解释器；

`#!/usr/bin/env node` 这种用法是为了防止操作系统用户没有将 node 装在默认的/usr/bin 路径里。当系统看到这一行的时候，首先会到 env 设置里查找 node 的安装路径，再调用对应路径下的解释器程序完成操作。

`#!/usr/bin node` 相当于写死了 node 路径;

`#!/usr/bin/env node` 会去环境设置寻找 node 目录,推荐这种写法

常用于 `rollup.output.banner`
