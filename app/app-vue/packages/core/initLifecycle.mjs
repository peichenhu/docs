export function initLifecycle(vm) {
	const options = vm.$options;

	// locate first non-abstract parent
  // 定位第一个非抽象父级
	let parent = options.parent;
	if (parent && !options.abstract) {
		while (parent.$options.abstract && parent.$parent) {
			parent = parent.$parent;
		}
		parent.$children.push(vm);
	}

	vm.$parent = parent;
	vm.$root = parent ? parent.$root : vm;

	vm.$children = [];
	vm.$refs = {};

	vm._watcher = null;
	vm._inactive = null;
	vm._directInactive = false;
	vm._isMounted = false;
	vm._isDestroyed = false;
	vm._isBeingDestroyed = false;
}
