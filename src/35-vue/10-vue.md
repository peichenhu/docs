# Vue

## VueTemplate 和响应式数据的绑定关系

`VueTemplate` 编译过程中使用 `with` 语句，尽管在 JS 中通常不建议使用它。<br/>
这是因为 `with` 语句可以简化模板编译过程，使得模板的作用域与 `with` 的作用域正好契合。<br/>

`VueTemplate` 可以在构建时预编译为渲染函数，这样在运行时就不需要使用 `with` 语句。<br/>
预编译可以通过像 `vue-loader` 这样的工具来实现。

```js
// 使用 new Function('scope') + with(scope){} + call(this) 转换代码块的上下文和作用域。
let expression = 'this.text + text';
let render = new Function('scope', `with(scope) { return ${expression}; }`);
let vm = { text: '我是 Vue this 的数据；' };
let data = { text: '我是 Vue data 的响应式数据；' };
let res = render.call(vm, data);
console.log(res);
// 我是 Vue this 的数据；我是 Vue data 的响应式数据；
```

## Vue2 响应式原理

Vue 通过 `Object.definedProperty` 对 data 上的属性重新定义，转为 getter/setter,
当使用对应的属性时进行依赖收集和创建 Watcher，如果属性发生了变化，就通知对应的依赖模块进行更新操作。

Vue 的数据双向绑定整合了 Observer，Compile 和 Watcher 三者，

-   通过 Observer 观测数据变化
-   通过 Compile 解析编译模板
-   通过 Watcher 负责 Observer 和 Compile 之间的通信，达到`数据变化->视图更新`，`视图交互变化->数据变更`的双向绑定效果。

## v-model 指令双向绑定的原理？

它是一个语法糖，等效于使用 :value 和 @input 事件的组合。

v-model 的工作原理可以分为以下步骤：

1. 首先，Vue 创建一个代理对象，其中包含了数据属性，例如 message。
1. 初始时，表单元素的值会被设置为数据属性的当前值。
1. 当用户输入文本时，@input 事件被触发，Vue 捕获用户输入的值，通常通过 $event 参数。
1. Vue 然后将捕获到的值更新到数据属性。
1. 由于双向数据绑定的机制，数据属性的值的变化会自动反映到表单元素的值，实现了双向同步。

text 和 textarea 元素使用 value 属性和 input 事件
checkbox 和 radio 使用 checked 属性和 change 事件
select 字段将 value 作为 prop 并将 change 作为事件

## Vue3 响应式数据

### 为什么使用 Proxy ？

-   `Object.defineProperty` 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
-   `Object.defineProperty` 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果属性值是对象，还需要深度遍历。`Proxy` 可以劫持整个对象，并返回一个新的对象。
-   `Proxy` 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
-   `Proxy` 有多达 13 种拦截方法
-   `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化

### Proxy 深度观测？

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。

### 如何防止数组触发多次 get/set 呢？

判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，
只有满足以上两个条件之一时，才有可能执行 trigger。

### reactive 的局限性?

-   `有限的值类型`：它只能用于对象类型
-   `不能替换整个对象`：响应式跟踪是通过属性访问实现的
-   `对解构操作不友好`：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接

## 计算属性

避免了在模板中写太多逻辑，Vue 的计算属性会自动追踪响应式依赖，
计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。

::: warning 为什么需要缓存呢？
想象一下我们有一个非常耗性能的计算属性 list，需要循环一个巨大的数组并做许多计算逻辑，并且可能也有其他计算属性依赖于 list。没有缓存的话，我们会重复执行非常多次 list 的 getter，然而这实际上没有必要！如果你确定不需要缓存，那么也可以使用方法调用。
:::

## Vue2 中如何监测数组变化

使用了`函数劫持`的方式，`重写了数组的方法`。
Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。
这样当调用数组 api 时，可以通知依赖更新。
如果数组中包含着引用类型，会对数组中的`引用类型再次递归遍历进行监控`。

## nextTick

在下次 DOM 更新循环结束之后执行延迟回调。
nextTick 主要使用了`宏任务`和`微任务`。根据执行环境分别尝试采用

-   Promise
-   setImmediate
-   MessageChannel
-   如果以上都不行则采用 setTimeout

## 接口请求在哪个生命周期中?

接口请求一般放在 mounted 中，但需要注意的是服务端渲染时不支持 mounted，需要放到 created 中。

## Computed 对比 Watch

-   共同点都是用来`监听数据的变化`。
-   不同点是否有`缓存`功能？
    -   computed 是有缓存的，只有它依赖的`属性值改变`的时候，它才会进行计算。
    -   watch 是没有缓存功能的，只要监听的`数据变化`了，它就会触发相应的操作。
-   不同点是否支持`异步`？
    -   computed 是不支持异步的，当 computed 内有异步操作的时候，它是监听不到数据变化的。
    -   watch 是支持异步操作的，适合监听路由和设置计时器等。

## Vue 渲染器的 diff 算法？

简单来说，diff 算法有以下过程

-   同级比较，再比较子节点
-   先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)
-   比较都有子节点的情况(核心 diff)
-   递归比较子节点

正常 Diff 两个树的时间复杂度是 O(n^3)，但实际情况下我们很少会进行跨层级的移动 DOM，
所以 Vue 将 Diff 进行了优化，从 O(n^3) -> O(n)，只有当新旧 children 都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。

### Vue2-Diff 双端比较的算法

同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。
相比 React 的 Diff 算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

### Vue3 借鉴 ivi 算法和 inferno 算法

-   diff 无 key 子节点
-   diff 有 key 子节点
    -   起始位置节点类型相同。
    -   结束位置节点类型相同。
    -   相同部分处理完，有新增节点。
    -   相同部分处理完，有旧节点需要卸载。
    -   首尾相同，但中间部分存在可复用乱序节点。
        -   diff 的核心逻辑在于通过新旧节点的位置变化构建一个最大递增子序列，最大子序列能保证通过最小的移动或者 patch 实现节点的复用。

在创建 VNode 时就确定其类型，以及在 mount/patch 的过程中采用位运算来判断一个 VNode 的类型，
在这个基础之上再配合核心的 Diff 算法，使得性能上较 Vue2.x 有了提升。
该算法中还运用了动态规划的思想求解最大递增子序列。

> 资料：[Vue3 diff 算法图解分析](https://zhuanlan.zhihu.com/p/459134214)
