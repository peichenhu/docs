<!--
<script lang="ts" setup>
    import StickyDemo1 from '../.vitepress/components/sticky/demo-1.vue'
</script>
-->

# CSS

## font

```js
// 可设置的属性是（按顺序）：
// font-style font-variant font-weight font-size/line-height font-family
document.body.style.font = 'italic small-caps bold 12px arial,sans-serif';
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
