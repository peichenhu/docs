const createElement = () => {};
const resolveSlots = () => {};
const defineReactive = () => {};

export function initRender(vm) {
	vm._vnode = null; // the root of the child tree
	vm._staticTrees = null; // v-once cached trees

	const options = vm.$options;
	const parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
	const renderContext = parentVnode && parentVnode.context;

	vm.$slots = resolveSlots(options._renderChildren, renderContext);
	vm.$scopedSlots = emptyObject;

	vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
	vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);

	const parentData = parentVnode && parentVnode.data;

	defineReactive(vm, '$attrs', (parentData && parentData.attrs) || emptyObject, null, true);
	defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
}
