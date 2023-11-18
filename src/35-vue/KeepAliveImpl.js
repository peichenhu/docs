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
            // 
            const children = slots.default();
            const rawVNode = children[0];
            if (children.length > 1) {
                // 多个子节点
                current = null;
                return children;
            } else if (!isVNode(rawVNode)) {
                // 单个子节点且不是虚拟DOM
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

            const { include, exclude, max } = props;
            const b1 = include && (!name || !matches(include, name));
            const b2 = exclude && name && matches(exclude, name);
            if (b1 || b2) {
                current = vnode;
                return rawVNode;
            }

            const key = vnode.key == null ? comp : vnode.key;
            const cachedVNode = cache.get(key);

            // 变更前进行克隆，为重用做准备
            if (vnode.el) {
                vnode = cloneVNode(vnode);
            }

            pendingCacheKey = key;

            if (cachedVNode) {
                // 已经被缓存，则更新该缓存（LRU算法）
                // copy over mounted state
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
