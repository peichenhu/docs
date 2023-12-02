import Dep from "./Dep.mjs";

export function defineReactive(obj, key, val, customSetter, shallow) {
	const dep = new Dep();

	const property = Object.getOwnPropertyDescriptor(obj, key);
	if (property && property.configurable === false) {
		return;
	}

	// cater for pre-defined getter/setters
	const getter = property && property.get;
	if (!getter && arguments.length === 2) {
		val = obj[key];
	}
	const setter = property && property.set;

	let childOb = !shallow && observe(val);
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter() {
			const value = getter ? getter.call(obj) : val;
			if (Dep.target) {
				dep.depend();
				if (childOb) {
					childOb.dep.depend();
					if (Array.isArray(value)) {
						dependArray(value);
					}
				}
			}
			return value;
		},
		set: function reactiveSetter(newVal) {
			const value = getter ? getter.call(obj) : val;
			/* eslint-disable no-self-compare */
			if (newVal === value || (newVal !== newVal && value !== value)) {
				return;
			}
			/* eslint-enable no-self-compare */
			if (process.env.NODE_ENV !== 'production' && customSetter) {
				customSetter();
			}
			if (setter) {
				setter.call(obj, newVal);
			} else {
				val = newVal;
			}
			childOb = !shallow && observe(newVal);
			dep.notify();
		}
	});
}
