# Flex

Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。

```css
* {
	/* 容器属性 8 个 */
	display: 			flex; /* 弹性盒子 */
	align-content: 		flex-start flex-end center space-between space-around stretch; /* 设置行对齐 */
	flex-direction: 	row row-reverse column column-reverse; /* 子元素的排列方式 */
	flex-wrap: 			nowrap wrap wrap-reverse initial inherit; /* 子元素超出父容器时是否换行 */
	justify-content: 	flex-start flex-end center space-between space-around; /* 在主轴（横轴）方向上的对齐方式 */
	align-items: 		flex-start flex-end center baseline stretch; /* 在侧轴（纵轴）方向上的对齐方式 */
	row-gap: 			<length | percentage>; /* 行元素之间的间隙（gutter）大小 */
	column-gap: 		<length | percentage>; /* 列元素之间的间隙（gutter）大小 */

	/* 元素属性 5 个 */
	flex-grow: 			<number [0,∞]>; /* 元素在主轴方向上的增长系数 */
	flex-shrink: 		<number [0,∞]>; /* 元素在主轴方向上的收缩规则 */
	flex-basis: 		<auto | length | content>; /* 元素在主轴方向上的初始大小 */
	order: 				<integer>; /* 元素在布局时的顺序 */
	align-self: 		auto flex-start flex-end center baseline stretch; /* 元素对齐当前 grid 或 flex 行中的元素，并覆盖已有的 align-items 的值 */

	/* 容器属性简写  */
	flex-flow: 			<flex-direction> <flex-wrap>;
	place-items: 		<justify-content> <align-items>;
	gap: 				<row-gap> <column-gap>;

	/* 元素属性简写 */
	flex: 				<flex-grow> <flex-shrink> <flex-basis>;
}
```

## 轴线

两根轴线 — 主轴和交叉轴。主轴由 flex-direction 定义，另一根轴垂直于它。

```css
*{
    display: flex;

    flex-direction row; /* 元素的排列方向: row/row-reverse/column/column-reverse */
    flex-wrap: wrap; /* 多行容器: wrap/nowrap */
    flex-flow: <flex-direction> <flex-wrap>; /* 简写属性 */

}
```

## 元素的可用空间

```css
* {
	flex-grow: 1; /* 按比例分配增长空间: 0/1/2/.../n */
	flex-shrink: 1; /* 按比例分配收缩空间: 0/1/2/.../n */
	flex-basis: auto; /* 元素的空间大小: 设定尺寸/内容尺寸 */
	flex: <flex-grow> <flex-shrink> <flex-basis>; /**简写属性: initial/auto/none/设定值 */
	/* flex: 1 等同于 flex: 1 1 0 */
	/* flex: 2 等同于 flex: 2 1 0 */
	/* flex: initial 等同于 flex: 0 1 auto */
	/* flex: auto 等同于 flex: 1 1 auto */
	/* flex: none 等同于 flex: 0 0 auto */
}
```

## 元素间的对齐和空间分配

-   [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)
-   [justify-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items)
-   [place-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-items#auto)

```css
* {
	/* 元素在交叉轴方向对齐 */
	align-items: stretch; /* stretch|flex-start|flex-end|center */

	/* 元素在主轴方向上对齐 */
	justify-content: stretch; /* stretch|flex-start|flex-end|center|space-around|space-between */

	/* 简写 */
	place-items: <align-items> <justify-content>; /* auto|normal|inherit|initial|unset|设定值 */
}
```

## 网格间距

网格间距是网格轨道之间的间距

```css
* {
	row-gap: normal; /** 设定尺寸|inherit｜initial｜unset｜等等 */
	column-gap: normal; /** 设定尺寸|inherit｜initial｜unset｜等等 */
	gap: <row-gap> <column-gap>;
}
```
