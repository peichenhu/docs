# webpack

-   模块打包
-   编译兼容
-   自由扩展

## 模块打包运行原理

1. 读取 webpack 的配置参数；
2. 启动 webpack，创建 Compiler 对象并开始解析项目；
3. 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 Javascript 文件；
5. 整个过程中 webpack 会通过发布订阅模式，向外抛出一些 hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
6. 最终 Webpack 打包出来的 bundle 文件是一个 IIFE 的执行函数和静态资源。

## sourceMap

sourceMap 是一项将编译、打包、压缩后的`代码映射回源代码`的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中 debug 问题会带来非常糟糕的体验，sourceMap 可以帮助我们快速定位到源代码的位置，提高我们的开发效率。sourceMap 其实并不是 Webpack 特有的功能，而是 Webpack 支持 sourceMap，像 JQuery 也支持 souceMap。

## 如何配置

```js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.argv.indexOf("--mode=production") === -1;
module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        port: 3000,
        hot: true,
        contentBase: "../dist"
    },
    entry: {},
    output: {},
    module: {
        rules: []
    },
    optimization:{
        minimizer:[],
        splitChunks
    }
    resolve: {
        alias: {},
        extensions: []
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new vueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ]
};
```

## 优化

> 使用 webpack-bundle-analyzer 分析打包后的文件

### 速度优化

-   合理的 mode：development/production
-   快速查找文件：alias/include/exclude/extensions
-   增量编译
-   多进程编译: HappyPack
-   抽离第三方模块: 使用 webpack 内置的 DllPlugin DllReferencePlugin 进行抽离
-   第三方库免打包处理：externals
-   配置缓存: cache-loader

### 体积优化

-   splitChunks 公共模块抽离
-   第三方库免打包处理： externals
-   Tree-shaking

这里单独提一下 tree-shaking,是因为这里有个坑。tree-shaking 的主要作用是用来清除代码中无用的部分。目前在 webpack4 我们设置 mode 为 production 的时候已经自动开启了 tree-shaking。但是要想使其生效，生成的代码必须是 ES6 模块。不能使用其它类型的模块如 CommonJS 之流。如果使用 Babel 的话，这里有一个小问题，因为 Babel 的预案（preset）默认会将任何模块类型都转译成 CommonJS 类型，这样会导致 tree-shaking 失效。修正这个问题也很简单，在.babelrc 文件或在 webpack.config.js 文件中设置 modules： false 就好了

```js
// .babelrc
{
  "presets": [
    ["@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}

// 或者 webpack.config.js
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', { modules: false }]
                }
            }，
            exclude: /(node_modules)/
        }
    ]
}
```

## webpack 5

-   使用持久化缓存提高构建性能
-   改进的进度分析模式以显示每个插件和子步骤的时间
