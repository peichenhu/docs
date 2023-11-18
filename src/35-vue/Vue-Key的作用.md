## key

[#1]: https://cn.vuejs.org/api/built-in-special-attributes.html#key

[key][#1] 这个特殊的 attribute 主要作为 Vue 的虚拟 DOM 算法 (`dom-diff-by-key`) 提示，在比较新旧节点列表时用于识别 vnode。

## key 的预期值

预期：`number | string | symbol`；同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常。

## 没有 key 的情况

在没有 key 的情况下，Vue 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了 key，则将根据 key 的变化顺序来重新排列元素，并且将始终移除/销毁 key 已经不存在的元素。

## 用例

```vue
<!-- 与 v-for 结合： -->
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>

<!-- 也可以用于强制替换一个元素/组件而不是复用它。当你想这么做时它可能会很有用：-->
<!-- 当 text 变化时，<span> 总是会被替换而不是更新，因此 transition 将会被触发。 -->
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```
