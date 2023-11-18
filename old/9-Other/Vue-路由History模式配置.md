# Vue-路由History模式配置

> vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

## 第一步 配置 Vue Router

```js
const router = new VueRouter({
  mode: 'history',
  routes: []
})

```
## 第一步 配置 Webpack 
```js
// 配置 publicPath
output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
},

// 配置开发模式 devServer
devServer: {
    historyApiFallback: true, // VUE history
}

```
## 配置后端 Nginx
```shell
server {
    listen       80;
    server_name  blog.peichenhu.cn;
    # 匹配以/apis/开头的请求,反向代理
    location ^~ /api/ {
        proxy_pass http://koa.blog.peichenhu.cn/;
    }

    location / {
        root   /www/blog.vue/dist/;
        index  index.html index.htm;
        # 前端不走哈希路由，单页使用 History 正常路由正常时，后端要做相应的处理
        try_files $uri $uri/ /index.html last;
    }
}

```