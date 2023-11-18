## Keep-Alive

[#1]: https://cn.vuejs.org/guide/built-ins/keep-alive.html

通过 [keep-alive][#1] 包裹的组件，可以帮助我们将一些不常变动或者需要缓存内容的组件保存在内存中，保留组件的状态，避免多次渲染，提高页面性能。

## 参数

keep-alive 组件支持接收 3 个参数，分别是:

-   include 字符串、数组、或正则表达式，名称匹配的组件会被缓存
-   exclude 字符串、数组、或正则表达式，名称匹配的组件不会被缓存
-   max 数字，最大支持缓存页面个数（类似一个 LRU 缓存）

## 生命周期函数

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活。

-   **onActivated：** 调用时机为首次挂载，以及每次从缓存中被重新插入时
-   **onDeactivated：** 在从 DOM 上移除、进入缓存，以及组件卸载时调用

## 坑点

-   缓存无效问题：根据`组件的 name` 进行匹配，所以组件要条件性地被 KeepAlive 缓存，就必须显式声明一个 name 选项。

-   实现返回不刷新、其他菜单进入刷新

## Vue-3-Keep-Alive-源码

```js
// core/packages/runtime-core/src/components/KeepAlive.ts
const KeepAliveImpl = {
    name: `KeepAlive`,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number],
    },
    setup(props, { slots }) {
        // 当前上下文对象
        const instance = getCurrentInstance();
        // 缓存的对象
        const cache = new Map();
        // 缓存的标识
        const keys = new Set();
        // 虚拟 DOM
        let current = null;
        // 基于过滤器删减 cache
        function pruneCache(filter) {
            cache.forEach((vnode, key) => {
                const name = getComponentName(vnode.type);
                if (name && (!filter || !filter(name))) {
                    pruneCacheEntry(key);
                }
            });
        }
        // 基于 KEY 删减 cache
        function pruneCacheEntry(key) {
            cache.delete(key);
            keys.delete(key);
        }
        // 规则变更时删减 cache
        watch(
            () => [props.include, props.exclude],
            ([include, exclude]) => {
                include && pruneCache((name) => matches(include, name));
                exclude && pruneCache((name) => !matches(exclude, name));
            },
            // 当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
            // 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。
            // 这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
            // 如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post' 选项：
            { flush: "post", deep: true }
        );
        // 待缓存关键KEY
        let pendingCacheKey = null;
        // 缓存子树
        const cacheSubtree = () => {
            if (pendingCacheKey != null) {
                cache.set(pendingCacheKey, getInnerChild(instance.subTree));
            }
        };
        // 挂载
        onMounted(cacheSubtree);
        // 更新
        onUpdated(cacheSubtree);
        // 卸载前
        onBeforeUnmount(() => {
            cache.forEach((cached) => unmount(cached));
        });
        // 主函数
        return () => {
            // 初始化标识符为空
            pendingCacheKey = null;

            // 没有要缓存的内容时直接返回空
            if (!slots.default) return null;

            const children = slots.default();
            const rawVNode = children[0];
            if (children.length > 1) {
                // 多个子节点，不符合条件
                current = null;
                return children;
            } else if (!isVNode(rawVNode)) {
                // 单个子节点且不是虚拟DOM，不符合条件
                current = null;
                return rawVNode;
            }

            // 拿到虚拟DOM
            let vnode = getInnerChild(rawVNode);
            const comp = vnode.type;

            // 对于异步组件，名称检查应该基于其加载的内部组件（如果可用）
            const name = getComponentName(
                isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
            );

            // 未命中缓存条件
            const { include, exclude, max } = props;
            const b1 = include && (!name || !matches(include, name));
            const b2 = exclude && name && matches(exclude, name);
            if (b1 || b2) {
                current = vnode;
                return rawVNode;
            }

            // 命中缓存条件
            const key = vnode.key == null ? comp : vnode.key;
            const cachedVNode = cache.get(key);
            pendingCacheKey = key;

            // 变更前进行克隆，为重用做准备
            if (vnode.el) vnode = cloneVNode(vnode);

            if (cachedVNode) {
                // 已经被缓存过，则更新该缓存（LRU算法）
                vnode.el = cachedVNode.el;
                vnode.component = cachedVNode.component;
                if (vnode.transition)
                    setTransitionHooks(vnode, vnode.transition);
                keys.delete(key);
                keys.add(key);
            } else {
                // 新缓存
                keys.add(key);
                // 缓存容量溢出检测
                if (max && keys.size > parseInt(max, 10)) {
                    pruneCacheEntry(keys.values().next().value);
                }
            }
            current = vnode;
            return isSuspense(rawVNode.type) ? rawVNode : vnode;
        };
    },
};
```
