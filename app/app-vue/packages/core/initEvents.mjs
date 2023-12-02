const updateComponentListeners = () => {};
export function initEvents(vm) {
	vm._events = Object.create(null);
	vm._hasHookEvent = false;
	// init parent attached events
	const listeners = vm.$options._parentListeners;
	if (listeners) {
		updateComponentListeners(vm, listeners);
	}
}
