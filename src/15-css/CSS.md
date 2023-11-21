# CSS

## font

```js
// 可设置的属性是（按顺序）：
// font-style font-variant font-weight font-size/line-height font-family
document.body.style.font = "italic small-caps bold 12px arial,sans-serif";
// font-style	            规定字体样式。
// font-variant	            规定字体异体。
// font-weight	            规定字体粗细。
// font-size/line-height	规定字体尺寸和行高。 (必需 font-size)
// font-family	            规定字体系列。 (必需 font-family)
```

## 盒模型

> 外边距 Margin + 边 Border + 内边距 Padding + 内容 Content

-   标准盒模型 box-sizing: content-box; (width = Content)
-   怪异盒模型 box-sizing: border-box; (width = Content + Padding + Border)

## position

### static

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。`此时 top, right, bottom, left 和 z-index 属性无效`。

### relative

该关键字下，元素先放置在未添加定位时的位置，再`在不改变页面布局的前提下调整元素位置`

### absolute

元素会被移出正常文档流，并不为元素预留空间，通过指定元素`相对于最近的非 static 定位祖先元素的偏移`，来确定元素位置。绝对定位的元素可以设置外边距，且不会与其他边距合并。

### fixed

元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于`屏幕视口（viewport）`的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 `transform、perspective、filter 或 backdrop-filter` 属性非 none 时，容器由视口改为该祖先。

### sticky

元素根据正常文档流进行定位，然后`相对它的最近滚动祖先`和 `最近块级祖先`，包括 table-related 元素，`基于 top、right、bottom 和 left 的值进行偏移`。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的层叠上下文。

注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。

## transform

通过改变坐标空间，可以在不影响正常文档流的情况下改变`使用盒模型来定位的元素`的位置。
有两个主要的属性被用来定义 CSS 变换：transform（或单独的 translate、rotate 以及 scale 属性）和 transform-origin。

```css
* {
    /* Keyword values */
    transform: none;

    /* Function values */
    transform: matrix(1, 2, 3, 4, 5, 6);
    transform: translate(12px, 50%);
    transform: translateX(2em);
    transform: translateY(3in);
    transform: scale(2, 0.5);
    transform: scaleX(2);
    transform: scaleY(0.5);
    transform: rotate(0.5turn);
    transform: skew(30deg, 20deg);
    transform: skewX(30deg);
    transform: skewY(1.07rad);
    transform: matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    transform: translate3d(12px, 50%, 3em);
    transform: translateZ(2px);
    transform: scale3d(2.5, 1.2, 0.3);
    transform: scaleZ(0.3);
    transform: rotate3d(1, 2, 3, 10deg);
    transform: rotateX(10deg);
    transform: rotateY(10deg);
    transform: rotateZ(10deg);
    transform: perspective(17px);

    /* Multiple function values */
    transform: translateX(10px) rotate(10deg) translateY(5px);

    /* Global values */
    transform: inherit;
    transform: initial;
    transform: unset;
}
```

## transition

```css
transition: <property> <duration> <timing-function> <delay>;
```

CSS 过渡可以决定哪些属性发生动画效果，何时开始，持续多久以及如何动画。

## animation

> animation: name duration timing-function delay iteration-count direction fill-mode play-state;

```css
/* 规定动画 */
@keyframes myfirst {
    /* prettier-ignore */
    from { background: red; }
    /* prettier-ignore */
    to { background: yellow; }
}
/* 
@keyframes myfirst {
    0% { background: red; }
    50% { background: blue; }
    100% { background: green; }
}
*/
* {
    animation: myfirst 5s linear 2s infinite alternate running; /* 所有动画属性的简写属性 */
    animation-name: myfirst; /* 规定 @keyframes 动画的名称 */
    animation-duration: 5s; /* 规定动画完成一个周期所花费的秒或毫秒。默认是 0 */
    animation-timing-function: linear; /* 规定动画的速度曲线。默认是 "ease" */
    animation-delay: 2s; /* 规定动画何时开始。默认是 0*/
    animation-iteration-count: infinite; /* 规定动画被播放的次数。默认是 1 */
    animation-direction: alternate; /* 规定动画是否在下一周期逆向地播放。默认是 "normal" */
    animation-play-state: running; /* 规定动画是否正在运行或暂停。默认是 "running" */
}
```
