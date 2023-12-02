export function initInjections(vm) {
	const result = resolveInject(vm.$options.inject, vm);
	if (result) {
		toggleObserving(false);
		Object.keys(result).forEach((key) => {
			/* istanbul ignore else */
			if (process.env.NODE_ENV !== 'production') {
				defineReactive(vm, key, result[key], () => {
					warn(
						`Avoid mutating an injected value directly since the changes will be ` +
							`overwritten whenever the provided component re-renders. ` +
							`injection being mutated: "${key}"`,
						vm
					);
				});
			} else {
				defineReactive(vm, key, result[key]);
			}
		});
		toggleObserving(true);
	}
}
