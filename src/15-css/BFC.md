<script lang="ts" setup>
    import BFCDemo1 from '../.vitepress/components/bfc/demo-1.vue'
    import BFCDemo2 from '../.vitepress/components/bfc/demo-2.vue'
    import BFCDemo3 from '../.vitepress/components/bfc/demo-3.vue'
</script>

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

---

## 避免高度塌陷

::: details 查看代码

<<< @/.vitepress/components/bfc/demo-1.vue

:::

::: info 避免高度塌陷: 将包含浮动元素的父元素设置为 BFC

<BFCDemo1 />

:::

## 避免外边距折叠(相邻元素)

::: details 查看代码

<<< @/.vitepress/components/bfc/demo-2.vue

:::

::: info 避免外边距折叠: 相邻元素外边距折叠，给其中一个元素添加一个 BFC 容器

<BFCDemo2 />

:::

## 避免外边距折叠(父子元素)

如果块级父元素中，不存在`上边框`、`上内补`、`inline content`、 `清除浮动`这四条属性，<br />
(对于上边框和上内补，也可以说，当上边距及上内补宽度为 0 时)，<br />
那么这个`块级元素`和`其第一个子元素`就会发生`上边距折叠`。 <br />
这个折叠之后的值在这里取的就是`两者之间的最大值`。

::: details 查看代码

<<< @/.vitepress/components/bfc/demo-3.vue

:::

::: info 避免外边距折叠: 父子元素，给父元素设置 BFC

<BFCDemo3 />

:::
