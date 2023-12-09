# Vue2 的 new Vue() 做了什么？


## new Vue() 之前做了什么？

```js
// vue-2.5.16/src/core/instance/init.js
// 创建全局对象
function Vue(options) {
	this._init(options);
}
// 创建全局对象的属性方法
// initMixin(Vue)
//    Vue._init = *
// stateMixin(Vue)
//    Vue.prototype.$set = *
//    Vue.prototype.$delete = *
//    Vue.prototype.$data = *
//    Vue.prototype.$props = *
// eventsMixin(Vue)
//    Vue.prototype.$on = *
//    Vue.prototype.$once = *
//    Vue.prototype.$off = *
//    Vue.prototype.$emit = *
// lifecycleMixin(Vue)
//    Vue.prototype._update = *
//    Vue.prototype.$forceUpdate = *
//    Vue.prototype.$destroy = *
// renderMixin(Vue)
//    installRenderHelpers(Vue.prototype)
//    Vue.prototype.$nextTick = *
//    Vue.prototype._render = *
// initGlobalAPI(Vue)
//    Vue.util = *
//    Vue.set = *
//    Vue.delete = *
//    Vue.nextTick = *
//    Vue.use = *
//    Vue.mixin = *
//    Vue.extend = *
//    Vue.options = Object.create(null)
//    Vue.options['components'] = Object.create(null)
//    Vue.options['directivs'] = Object.create(null)
//    Vue.options['filtes'] = Object.create(null)
```

## new Vue(App or {}) 做了什么？

```js
// vue-2.5.16/src/core/instance/init.js
// 执行 new Vue 会调用方法 this._init(options);

let uid = 0;
Vue.prototype._init = function (options?: Object) {
	const vm: Component = this;

	if (options && options._isComponent) {
		// 内部组件
		initInternalComponent(vm, options);
	} else {
		// 配置项
		vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
	}
	vm._uid = uid++;
	vm._isVue = true;
	vm._self = vm; // 暴露真实自我

	initLifecycle(vm); // 初始化生命周期
	initEvents(vm); // 初始化事件
	initRender(vm); // 初始化渲染
	callHook(vm, 'beforeCreate'); // 调用生命周期钩子函数
	initInjections(vm); //初始化 injections
	initState(vm); // 初始化 props, methods, data, computed, watch
	initProvide(vm); // 初始化 provide
	callHook(vm, 'created'); // 调用生命周期钩子函数

	if (vm.$options.el) vm.$mount(vm.$options.el); // 尝试挂载真实 DOM
};
```
