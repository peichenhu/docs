# BFC

> [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
> 区块格式化上下文（Block Formatting Context）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

`BFC 主要创建方式：`

-   浮动元素（即 float 值不为 none 的元素）。
-   overflow 值不为 visible 或 clip 的块级元素。
-   position 的值不为 static 或者 relative

`BFC 解决什么？`

格式化上下文影响布局，通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局

-   包含内部浮动，防止父元素高度塌陷。
-   排除外部浮动，防止覆盖兄弟元素和禁止文本环绕。
-   阻止垂直方向外边距重叠（包含兄弟元素外边距重叠和父子元素外边距折叠）。
