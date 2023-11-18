# Vue

## Vue 虚拟 DOM

### 虚拟 DOM 是什么？

虚拟 DOM 就是用 JS 对象来描述一个 DOM 节点。

### 虚拟 DOM 解决了什么?

一个空的 DIV 元素自身含有大量属性和方法，操作真实的 DOM 十分消耗性能，频繁大量的操作更严重。为了尽量减少操作，我们需要一个虚拟的 DOM 来收集、对比新旧虚拟 DOM 节点和处理复杂操作，然后再同步到真实 DOM。

### Vue 虚拟 DOM 设计源码

Vue 中使用 `Vnode` 类实例化出不同类型的虚拟节点, 把写好的 `template 模板`先编译成 `VNode` 并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的 `VNode` 与前一次缓存下来的 `VNode` 进行对比，找出差异，然后有差异的 `VNode` 对应的`真实 DOM 节点`就是需要重新渲染的节点，最后根据有差异的 `VNode` 创建出`真实的 DOM 节点`再插入到视图中，最终完成一次视图更新。

```js
export default class VNode {
    constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
        this.tag = tag; // 当前节点的标签名
        this.data = data; // 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息
        this.children = children; // 当前节点的子节点，是一个数组
        this.text = text; // 当前节点的文本
        this.elm = elm; // 当前虚拟节点对应的真实dom节点
        this.ns = undefined; // 当前节点的名字空间
        this.context = context; // 当前组件节点对应的Vue实例
        this.fnContext = undefined; // 函数式组件对应的Vue实例
        this.fnOptions = undefined; // 函数式组件对应的Vue实例
        this.fnScopeId = undefined; // 函数式组件对应的Vue实例
        this.key = data && data.key; // 节点的key属性，被当作节点的标志，用以优化
        this.componentOptions = componentOptions; // 组件的option选项
        this.componentInstance = undefined; // 当前节点对应的组件的实例
        this.parent = undefined; // 当前节点的父节点
        this.raw = false; // 简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
        this.isStatic = false; // 静态节点标志
        this.isRootInsert = true; // 是否作为跟节点插入
        this.isComment = false; // 是否为注释节点
        this.isCloned = false; // 是否为克隆节点
        this.isOnce = false; // 是否有v-once指令
        this.asyncFactory = asyncFactory;
        this.asyncMeta = undefined;
        this.isAsyncPlaceholder = false;
    }
}
export const createEmptyVNode = (text: string = "") => {
    const node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
};
export function createTextVNode(val: string | number) {
    return new VNode(undefined, undefined, undefined, String(val));
}
```

## Vue diff 算法

### 什么是 diff 算法

对比两个文件的差异性，或者查看一个文件的两个版本的区别。两个树在比较的过程中如果用树形结构去比较，时间复杂度是 O(n^3)，为了降低整个复杂度引入 diff 算法使时间复杂度到 O(n);

常见的应用场景有:

1.  linux 中的 diff 命令展示出两个文件的不同
2.  git diff 查看一个文件的两个版本的区别
3.  虚拟 DOM 对比新旧两个节点的变更差异,解决浏览器性能问题
    -   减少 DOM 操作避免`新建/回流/重绘`, 用 diff 算法找出 DOM 必须更新的节点来更新，其余不更新
        -   `回流`：当页面中的元素的大小或是位置等发生改变，浏览器会根据改变对页面的结构重新计算
        -   `重绘`：当页面中元素的背景，颜色改变引发浏览器对元素重新描绘。

### vue 的 diff 算法

vue 创建了虚拟 DOM，

## Vue 响应式原理

### getter/setter

### Dep

### Watcher

## Vue.set

## Vue.nextTick

`nextTick` 是在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

### 宏任务和微任务

在浏览器环境中，JS 主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 任务队列中存放的是一个个的任务（task）。 规范中规定 task 分为两大类，分别是宏任务(macro task) 和微任务(micro task），并且每执行完一个个宏任务(macro task)后，都要去清空该宏任务所对应的微任务队列中所有的微任务(micro task），他们的执行顺序如下所示：

-   宏任务(macro task) 有 `setTimeout`、`MessageChannel`、`postMessage`、`setImmediate`；
-   微任务(micro task）有 `MutationObsever` 和 `Promise.then`。

### 源码关键信息分析

-   `nextTick` 使用了异步锁防抖处理处理
-   `nextTick` 使用了参数兼容，可以不传回调函数，也可以指定组件实例对象
-   `nextTick` 有优先选择的异步回调函数是 `Promise` > `MutationObserver` > `setImmediate` > `setTimeout`

```js
let timerFunc;
let isUsingMicroTask = false;
let pending = false;
const callbacks = [];
function noop() {}

// 刷新回调函数
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

// 优先选择：Promise > MutationObserver > setImmediate > setTimeout
if (typeof Promise !== "undefined" && isNative(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => p.then(flushCallbacks);
    isUsingMicroTask = true; // 标记为微任务
} else if (!isIE && typeof MutationObserver !== "undefined") {
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks); // 创建一个观察器实例监视对DOM树并传入回调函数
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true // 监视指定目标节点或子节点树中节点所包含的字符数据的变化
    });
    timerFunc = () => (textNode.data = String(++counter % 2));
    isUsingMicroTask = true; // 标记为微任务
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
    timerFunc = () => setImmediate(flushCallbacks);
} else {
    timerFunc = () => setTimeout(flushCallbacks, 0);
}

// nextTick
function nextTick(cb?: Function, ctx?: Object) {
    let _resolve;
    // 将回调函数推入回调队列
    callbacks.push(() => (cb ? cb.call(ctx) : _resolve ? _resolve(ctx) : undefined));
    // 如果异步锁未锁上，异步锁防抖处理，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
    if (!pending) {
        pending = true;
        timerFunc();
    }
    if (!cb && typeof Promise !== "undefined") {
        return new Promise((res) => (_resolve = res));
    }
}
```

1. **问题一: 如何保证只在接收第一个回调函数时执行异步方法？**

nextTick 源码中使用了一个异步锁的概念，即接收第一个回调函数时，先关上锁，执行异步方法。此时，浏览器处于等待执行完同步代码就执行异步代码的情况。

2. **问题二: 执行 flushCallbacks 函数时为什么需要备份回调函数队列？执行的也是备份的回调函数队列？**

因为，会出现这么一种情况：nextTick 的回调函数中还使用 nextTick。如果 flushCallbacks 不做特殊处理，直接循环执行回调函数，会导致里面 nextTick 中的回调函数会进入回调队列。

## Vue 组件通信

1. `props / $emit`

    - 父子组件通信基础方法，`v-bind` 传入,`props` 传入接收，`v-on` 监听回调函数，`$emit` 调起回调函数。

2. `$parent / $children（ref）`

    - 直接访问父子组件实例进行通信
    - ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

3. `EventBus（$emit / $on）`

    - 通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

4. `$attrs / $listeners`

    - `$attrs`：包含父组件中`不被 props 使用`的特性 (class 和 style 除外)。当一个组件没有声明任何 `props` 时，可以通过 `v-bind="$attrs" `传入内部组件。配合是否根元素继承属性 `inheritAttrs` 选项一起使用。
    - `$listeners`：包含父组件中的 (不含 `.native` 修饰器的) `v-on 事件监听器`。它可以通过` v-on="$listeners"` 传入内部组件

5. `provide / inject`

    - 祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。

6. `Vuex`

    - Vuex 是一个专为 Vue.js 应用程序开发的响应式状态管理模式。

## Vue 生命周期

| 生命周期               | 描述                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| beforeCreate           | 组件实例被创建之初，组件的属性生效之前                                |
| created                | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 |
| beforeMount            | 在挂载开始之前被调用：相关的 render 函数首次被调用                    |
| mounted                | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子             |
| beforeUpdate           | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前                       |
| update                 | 组件数据更新之后                                                      |
| activited              | keep-alive 专属，组件被激活时调用                                     |
| deactivated keep-alive | 专属，组件被销毁时调用                                                |
| beforeDestory          | 组件销毁前调用                                                        |
| destoryed              | 组件销毁后调用                                                        |

### Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

-   加载渲染过程

    -   父 beforeCreate ->
    -   父 created ->
    -   父 beforeMount ->
        -   子 beforeCreate ->
        -   子 created ->
        -   子 beforeMount ->
        -   子 mounted ->
    -   父 mounted

-   子组件更新过程

    -   父 beforeUpdate ->
        -   子 beforeUpdate ->
        -   子 updated ->
    -   父 updated

-   父组件更新过程

    -   父 beforeUpdate ->
    -   父 updated

-   销毁过程

    -   父 beforeDestroy ->
        -   子 beforeDestroy ->
        -   子 destroyed ->
    -   父 destroyed

## Vue computed/watch

### computed

-   `computed` 是一个`惰性求值`的属性，挂载在实例上。
-   `computed` 未被访问时不计算。
-   `computed` 被用于`多个数据影响一个数据`
-   `computed` 只有`初次访问时`和`依赖的响应式数据发生变化后访问时`才会进行计算并缓存计算结果，反之直接`读取缓存`。

```js
export default {
    // 所以，对于模板中的任何复杂逻辑，你都应当使用计算属性。
    computed: {
        // 简单模式
        val: function () {
            return this.a;
        },
        // 复杂模式
        some: {
            // 计算属性是否开启缓存
            cache: false,
            // getter
            get() {
                console.log("some getter");
                return this.a + this.b + this.c;
            },
            // setter
            set(a, b, c) {
                // 这里由于该计算属性被赋值，将被调用
                // 适用于自身依赖多个属性时，直接赋值操作
                this.a = a;
                this.a = b;
                this.a = c;
            }
        }
    }
};

// 问题：some 依赖多个值，但这些值同时改变，为什么 some 只会计算一次？
// 解答：因为 some 的访问者（视图）会通过 some 找到并记录 some 依赖的数据直接建立依赖关系，
//      some 依赖的数据发生变化会通知访问者（视图），访问者在下次
```

### watch

-   `watch` 被用于`一个数据影响多个数据`
-   `watch` 可以监听 computed 数据 或者其他已经存在且已挂载到实例上的数据
-   `watch` 能够深度监听
-   `watch` 依赖的响应式数据发生变化后立刻执行

```js
var vm = new Vue({
    watch: {
        a: function (val, oldVal) {
            console.log("new: %s, old: %s", val, oldVal);
        },
        // methods选项中的方法名
        b: "someMethod",
        // 深度侦听，该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        c: {
            handler: function (val, oldVal) {
                /* ... */
            },
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: "someMethod",
            immediate: true
        },
        // 调用多个回调
        e: [
            "handle1",
            function handle2(val, oldVal) {
                /* ... */
            },
            {
                handler: function handle3(val, oldVal) {
                    /* ... */
                }
            }
        ],
        // 侦听表达式
        "e.f": function (val, oldVal) {
            /* ... */
        }
    }
});
```

## 其他问题

### Vue 用到了哪些设计模式

-   观察者模式（ Watcher 类 ）
-   订阅发布模式（ Dep 类 ）
-   单例模式 （keep-alive、initUse）
-   工厂模式 ( VNode 类)

### 列表组件中写 key 的作用是什么

key 是给每一个 vnode 的唯一 id,可以依靠 key,更准确, 更快的拿到 oldVnode 中对应的 vnode 节点,提高 diff 速度。

1. 更准确

因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

2. 更快

利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map 会比遍历更快。)

### v-if 和 v-for 一起使用的弊端

-   由于 v-for 的优先级比 v-if 高，所以导致每循环一次就会去 v-if 一次
-   而 v-if 是通过创建和销毁 dom 元素来控制元素的显示与隐藏,所以就会不停的去创建和销毁元素，造成页面卡顿，性能下降。

解决办法：在 v-for 的外层或内层包裹一个元素来使用 v-if

## 参考资料

[Vue 原理】月老 Computed - 白话版](https://segmentfault.com/a/1190000019605778)
