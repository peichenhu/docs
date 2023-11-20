# vue-keep-alive

> 分析：vue@2.5.16/dist/vue.common.js#KeepAlive

[#1]: https://v2.cn.vuejs.org/v2/api/#keep-alive

通过 [keep-alive][#1] 包裹的组件，可以帮助我们将一些不常变动或者需要缓存内容的组件保存在内存中，保留组件的状态，避免多次渲染，提高页面性能。

```vue
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

## 生命周期函数

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活。

-   **onActivated：** 调用时机为首次挂载，以及每次从缓存中被重新插入时
-   **onDeactivated：** 在从 DOM 上移除、进入缓存，以及组件卸载时调用

## 注意事项

-   缓存无效：根据 `组件的 name` 进行匹配，所以组件要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

-   特殊功能：实现返回不刷新、其他菜单进入刷新

## 前置依赖

```js
// 获取组件名称
function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag);
}

// name 的规则匹配：数组包含匹配、字符串匹配、正则匹配
function matches(pattern, name) {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1;
    } else if (typeof pattern === "string") {
        return pattern.split(",").indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
        return pattern.test(name);
    }
    /* istanbul ignore next */
    return false;
}

// 清理缓存入口函数
function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache; // {...}
    var keys = keepAliveInstance.keys; // [...]
    var _vnode = keepAliveInstance._vnode; // VNode
    for (var key in cache) {
        var cachedNode = cache[key];
        if (cachedNode) {
            // 缓存存在
            var name = getComponentName(cachedNode.componentOptions);
            if (name && !filter(name)) {
                // 判断：规则过滤表示不需要缓存
                // 执行：清理这个key的缓存
                pruneCacheEntry(cache, key, keys, _vnode);
            }
        }
    }
}

// Remove an item from an array
function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}

// 清理缓存执行函数
function pruneCacheEntry(cache, key, keys, current) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
        // 判断：缓存对象 && (!虚拟DOM || 缓存对象.tag !== 虚拟DOM.tag)
        // 执行：缓存对象执行实例销毁
        cached$$1.componentInstance.$destroy();
    }
    // 从缓存哈希表删除它
    cache[key] = null;
    // 从缓存队列删除它
    remove(keys, key);
}

// 获取 keep-alive 的第一个有效子节点，
// keep-alive 不允许存在多个子节点，多余的会被忽略
function getFirstComponentChild(children) {
    // prettier-ignore
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
}
```

## 核心源码

```js
var KeepAlive = {
    name: "keep-alive",
    abstract: true,

    // 支持参数 3 个
    props: {
        include: patternTypes, // 包含，支持表达式
        exclude: patternTypes, // 不包含，支持表达式
        max: [String, Number], // 最大缓存数量（LRU）
    },

    created: function created() {
        // 缓存哈希表，去重映射
        this.cache = Object.create(null);
        // 缓存队列，先进先出，push 进 pop 出
        this.keys = [];
    },

    destroyed: function destroyed() {
        // 组件销毁，缓存全部销毁
        var this$1 = this;
        for (var key in this$1.cache) {
            pruneCacheEntry(this$1.cache, key, this$1.keys);
        }
    },

    mounted: function mounted() {
        // 挂载完成，执行缓存
        var this$1 = this;

        this.$watch("include", function (val) {
            pruneCache(this$1, function (name) {
                return matches(val, name);
            });
        });

        // exclude 优先级更高
        this.$watch("exclude", function (val) {
            pruneCache(this$1, function (name) {
                return !matches(val, name);
            });
        });
    },

    // 组件渲染函数
    render: function render() {
        var slot = this.$slots.default;
        // 获取有效的单独子节点
        var vnode = getFirstComponentChild(slot);
        var componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
            // 获取组件名称 name，用于检查并使用旧缓存
            var name = getComponentName(componentOptions);
            var ref = this;
            var include = ref.include;
            var exclude = ref.exclude;
            if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
            ) {
                // 判断：不允许使用旧缓存
                // 执行：返回新的 VNode
                return vnode;
            }

            // ==========================================
            // ===> 以下是允许缓存的逻辑
            // ==========================================

            var ref$1 = this;
            var cache = ref$1.cache;
            var keys = ref$1.keys;
            var key =
                vnode.key == null
                    ? // 同一构造函数可以注册为不同的本地组件
                      // 所以单用 cid 是不够的（#3269）
                      componentOptions.Ctor.cid +
                      (componentOptions.tag ? "::" + componentOptions.tag : "")
                    : vnode.key;
            if (cache[key]) {
                // 判断：存在旧缓存
                // 执行：使用旧缓存
                vnode.componentInstance = cache[key].componentInstance;
                // 执行：更新缓存队列中 key 的新鲜度（LRU 先进先出）
                remove(keys, key);
                keys.push(key);
            } else {
                // 判断：不存在旧缓存
                // 执行：新增缓存
                cache[key] = vnode;
                keys.push(key);
                if (this.max && keys.length > parseInt(this.max)) {
                    // 执行：最大缓存容量检查，溢出，删除老新鲜度的 key
                    pruneCacheEntry(cache, keys[0], keys, this._vnode);
                }
            }
            /**
             * 添加一个 keepAlive 属性标识符。
             * 当组件在 <keep-alive> 内被切换，用于驱动 activated 和 deactivated 这两个生命周期钩子函数
             * 2.2.0+版本，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。
             */
            vnode.data.keepAlive = true;
        }
        return vnode || (slot && slot[0]);
    },
};
```

