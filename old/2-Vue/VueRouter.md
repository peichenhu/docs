# VueRouter

## 3 种模式

1. `hash`: 使用 `URL hash` 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
2. `history`: 依赖 `HTML5 History API` 和服务器配置。
3. `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 依赖的浏览器 API

-   URL hash

```js
window.onhashchange = function (e) {
    console.log(e.oldURL); // 输出 https://www.baidu.com/
    console.log(e.newURL); // 输出 https://www.baidu.com/#hash
};
window.location = "#hash"; // 或者 location.hash = "#hash"
```

-   HTML5 History API

    -   `state`: 查看 pushState() or replaceState() 修改后的 state 值，否则返回 null,不必等待 popstate 事件发生后再查看。
    -   `length`：只读属性，返回当前 session 中的 history 个数，包含当前页面在内。举个例子，对于新开一个 tab 加载的页面当前属性返回值 1。
    -   `back`: 在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作。
    -   `go`: 从会话历史记录中加载特定页面。你可以使用它在历史记录中前后移动，具体取决于 delta 参数的值。不传或者传零重新加载页面。
    -   `forward`: 在会话历史中向前移动一页。等同于 `history.go(1)`
    -   `pushState`: 向当前浏览器会话的历史堆栈中添加一个状态（state）。
    -   `replaceState`: 修改当前历史记录实体，如果你想更新当前的 state 对象或者当前历史实体的 URL 来响应用户的的动作的话这个方法将会非常有用。
    -   `onpopstate`: 当活动历史记录条目更改时，将触发 `popstate` 事件。

    需要注意的是调用 `history.pushState()`或 `history.replaceState()`不会触发 `popstate` 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 `history.back()`或者 `history.forward()`方法) 。不同的浏览器在加载页面时处理 `popstate` 事件的形式存在差异。页面加载时 Chrome 和 Safari 通常会触发 `popstate` 事件，但 Firefox 则不会。

```js
// 新开页面
location.href; // https://www.baidu.com/

window.addEventListener("popstate", (e) => {
    console.log("popstate: ", JSON.stringify(event.state)); // 当前记录的 state
});

window.history.length; // 1
window.history.state; // null
window.history.go(); // 刷新页面
window.history.go(0); // 刷新页面

window.location = "#hash"; // https://www.baidu.com/#hash
window.history.length; // 2

window.history.back(); // 向前移动一页 https://www.baidu.com/
window.history.forward(); // 向前移动一页 https://www.baidu.com/#hash

window.history.go(-1); // 向后移动一页 https://www.baidu.com/
window.history.go(1); // 向前移动一页 https://www.baidu.com/#hash

// 状态对象是一个JavaScript对象，它与传递给 replaceState 方法的历史记录实体相关联.
var state = { page_id: 1, user_id: 5 };
// 大部分浏览器忽略这个参数
var title = ""; // 大部分浏览器忽略这个参数
// 可选；历史记录实体的URL. 新的URL跟当前的URL必须是同源; 否则 replaceState 抛出一个异常.
var url = "hello-world.html";

history.pushState(state, title, url); // https://www.baidu.com/hello-world.html
window.history.state; // {page_id: 1, user_id: 5}
window.history.length; // 3

var state = { page_id: 2, user_id: 6 };
var title = "";
var url = "hello-history.html";

history.replaceState(state, title, url); // https://www.baidu.com/hello-history.html
window.history.state; // {page_id: 2, user_id: 6}
window.history.length; // 3
```

## history 路由 404

-   问题场景：

    1. 非入口根路由页面刷新页面 404
    2. 非入口根路由页面新开页面 404

-   具体原因：

Vue 是属于单页应用，不管我们有多少页面，都只会有一个入口 `index.html`。当遇到上面两种场景时，请求会发送到后端服务器，服务器找不到`非入口根路由页面`只能返回 404。

-   解决方案：

使用 hash 模式路由或者后端做支持配置

```bash
# nginx 配置
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
    try_files $uri $uri/ /index.html;
  }
}
# 配置更新命令 nginx -s reload
```

这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件；现在你可以在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面

```js
const router = new VueRouter({
    mode: "history",
    routes: [{ path: "*", component: NotFoundComponent }]
});
```
