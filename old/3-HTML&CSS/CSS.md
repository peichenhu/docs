# 学习 CSS

## CSS 盒模型

![some](https://www.runoob.com/images/box-model.gif)

```css
* {
    /* 
    W3C 标准模型 CSS2.1 个人不喜欢
    假如容器设置
    width:100px; border:10px solid; padding:10px; 
    那么容器最终可视宽度 
    100px(width === content) + 2 * 10px * (padding) + 2 * 10px(border) = 140px
    */
    box-sizing: content-box;
    /* 
    IE模型（怪异模式）个人推荐
    假如容器设置
    width:100px; border:10px solid; padding:10px; 
    那么容器最终可视宽度 
    60px(content) + 2 * 10px * (padding) + 2 * 10px(border) = 100px(width)
    */
    box-sizing: border-box;
}
```

## CSS Position

1. **static**

元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。

2. **relative**

元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。

3. **absolute**

元素框从文档流完全删除，并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

4.  **fixed**

元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。

5. **sticky**

基于用户的滚动位置来定位。粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。

它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;它会固定在目标位置。

元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

[demo](https://www.runoob.com/try/try.php?filename=trycss_position_sticky)

```css
div.sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: green;
    border: 2px solid #4caf50;
}
```

> 提示：相对定位实际上被看作普通流定位模型的一部分，因为元素的位置相对于它在普通流中的位置。

## BFC

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

1. html 根元素
2. float 浮动
3. 绝对定位
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局

BFC 特性：

1. 内部 box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定，在一个 BFC 中，两个相邻的块级盒子的垂直外边距会产生折叠。
3. 在 BFC 中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）
4. 形成了 BFC 的区域不会与 float box 重叠
5. 计算 BFC 高度时，浮动元素也参与计算

BFC 主要的作用是：

1. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
2. 清除浮动，利用特性 4 可实现左图右文之类的效果
3. 利用特性 5 可以解决浮动元素造成的父元素高度塌陷问题：

## CSS initial

initial 关键字用于设置 CSS 属性为它的默认值。

initial 关键字可用于任何 HTML 元素上的任何 CSS 属性。

## CSS 简写

-   font

```css
/** 
font: font-style font-variant font-weight font-size/line-height font-family; 
样式           font-style:   默认 normal  || 继承 inherit || 斜体 italic || 斜体 oblique;
小型大写字母文本 font-variant: 默认 normal  || 继承 inherit || 斜体 small-caps;
粗细           font-weight:  默认 normal  || 继承 inherit || 粗体 bold || 更粗 bolder || 更细 lighter || 100~900;
大小           font-size:    默认 normal  || 继承 inherit || 尺寸 xx-small ~ xx-large || 固定值 px/em/rem/vw/vh/vmin/vmax || 百分比 %;
行高           line-height:  默认 normal  || 继承 inherit || 倍数 number || 固定值 px/em/rem/vw/vh/vmin/vmax || 百分比 %;
字体           font-family:  继承 inherit || 名字：含有空格加引号，逗号分隔，优先级递减兜底
*/
* {
    font: 15px arial, sans-serif;
    font: 12px/30px Georgia, serif;
    font: italic bold 12px/30px Georgia, serif;
    font: italic small-caps bold 12px arial, sans-serif;
}
```

-   flex

```css
/*
语法
flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
扩展比率   flex-grow:   initial|inherit|number(0/1/2/...)
收缩规则   flex-shrink: initial|inherit|number(0/1/2/...)
伸缩基准值 flex-basis:  initial|inherit| 固定单位 xpos | 百分比 %
*/
* {
    flex: 0 1 auto;
    flex: none;
    flex: 0 0 auto;
    flex: auto;
    flex: 1 1 auto;
}
```

-   background

```css
/**
背景：各值之间用空格分隔，不分先后顺序。可以只有其中的某些值。
background: color image position/size repeat origin clip attachment initial|inherit;
颜色         background-color:    继承 inherit || 透明 transparent || 颜色值;
图片         background-image:    默认 none    || 继承 inherit || URL || 线性渐变/径向渐变/重复线性渐变/重复径向渐变;
重复         background-repeat:   默认 repeat  || 继承 inherit || repeat-y/repeat-x/no-repeat;
位置         background-position: 继承 inherit || center center (取值范围 center/left/right/top/bottom) || x% y% || xpos ypos;
大小         background-size:     auto || cover || contain || percentage || length;
相对         background-origin:   padding-box || border-box || content-box;
绘制区域      background-clip:     默认值 border-box || padding-box || content-box;
是否固定      bg-attachment:       默认值 随着页面 scroll || 继承 inherit || 固定fixed || 随元素内容 local
*/
* {
    background: #00ff00 url("smiley.gif") no-repeat fixed center;
    background: aquamarine url(img.png) no-repeat scroll center center/50% content-box content-box;
}
```

-   padding&margin

> 在默认的水平文档流方向下，margin 和 padding 属性的垂直方向的百分比值都是相对于父元素的宽度计算的，这个和 top, bottom 等属性的百分比值不一样。

```css
/* 
padding: 上边距 右边距 下边距 左边距 
margin: 上边距 右边距 下边距 左边距；
*/
* {
    padding: 0; /* 0 0 0 0 */
    padding: 0 1px; /* 0 1px 0 1px */
    padding: 0 1px 2px; /* 0 1px 2px 1px */
    padding: 0 1px 2px 3px; /* 0 1px 2px 3px */
}
```

-   border

```css
/* 
border: border-width  border-style border-color; 
*/
* {
    border: solid; /* 1px solid #000 */
    border: solid red; /* 1px solid red */
    border: 5px solid; /* 5px solid #000 */
    border: 5px solid red; /* 5px solid red */
}
```

## 实现固定比例的盒子

1. 使用 padding 属性的垂直方向的百分比值都是相对于父元素的宽度计算特性实现.(兼容性和表现更好)
2. 使用 img 进行盒子占位实现.(兼容性好和表现不好)
    - 不好：随着页面加载的进行，图片占据的高度会有一个从 0 到计算高度的图片变化，视觉上会有明显的元素跳动，代码层面会有布局重计算。
