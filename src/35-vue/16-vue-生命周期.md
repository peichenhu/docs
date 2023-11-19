# Vue 生命周期

生命周期就是一个 Vue 实例 `创建`、`挂载`、`更新`、`销毁` 的过程，开发者可以在对应的阶段执行业务逻辑。

![lifecycle](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

-   `加载渲染过程：`

```
父 beforeCreate =>
父 created =>
父 beforeMount =>
    子 beforeCreate =>
    子 created =>
    子 beforeMount =>
    子 mounted =>
父 mounted
```

-   `子组件更新过程：`

```
父 beforeUpdate =>
    子 beforeUpdate =>
    子 updated =>
父 updated
```

-   `销毁过程：`

```
父 beforeDestroy =>
    子 beforeDestroy =>
    子 destroyed =>
父 destroyed
```
