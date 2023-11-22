<script lang="ts" setup>
    import StickyDemo1 from '../.vitepress/components/sticky/demo-1.vue'
</script>


# position

## static

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。`此时 top, right, bottom, left 和 z-index 属性无效`。

## relative

该关键字下，元素先放置在未添加定位时的位置，再`在不改变页面布局的前提下调整元素位置`

## absolute

元素会被移出正常文档流，并不为元素预留空间，通过指定元素`相对于最近的非 static 定位祖先元素的偏移`，来确定元素位置。绝对定位的元素可以设置外边距，且不会与其他边距合并。

## fixed

元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于`屏幕视口（viewport）`的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 `transform、perspective、filter 或 backdrop-filter` 属性非 none 时，容器由视口改为该祖先。

## sticky

元素根据正常文档流进行定位，然后`相对它的最近滚动祖先`和 `最近块级祖先`，包括 table-related 元素，`基于 top、right、bottom 和 left 的值进行偏移`。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的层叠上下文。

注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。

::: details 查看代码

<<< @/.vitepress/components/sticky/demo-1.vue

:::

::: details 查看效果

<StickyDemo1 />

:::
