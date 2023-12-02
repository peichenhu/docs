const mergeOptions = () => {};
const resolveConstructorOptions = () => {};

import { initLifecycle } from './initLifecycle.mjs';
import { initEvents } from './initEvents.mjs';
import { initRender } from './initRender.mjs';

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this;

		vm._uid = uid++;
		vm._isVue = true;
		vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
		vm._renderProxy = vm;
		vm._self = vm;

		initLifecycle(vm);
		initEvents(vm);
		initRender(vm);
		callHook(vm, 'beforeCreate');
		initInjections(vm); // resolve injections before data/props
		initState(vm);
		initProvide(vm); // resolve provide after data/props
		callHook(vm, 'created');

		if (vm.$options.el) {
			vm.$mount(vm.$options.el);
		}
	};
}
