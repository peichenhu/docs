import { defineReactive } from "./index.mjs";

export class Observer {
	value;
	dep;
	vmCount; // 将此对象作为根 $data 的 vm 数

	constructor(value) {
		this.value = value;
		this.dep = new Dep();
		this.vmCount = 0;
		def(value, '__ob__', this);
		if (Array.isArray(value)) {
			const augment = hasProto ? protoAugment : copyAugment;
			augment(value, arrayMethods, arrayKeys);
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	walk(obj) {
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			defineReactive(obj, keys[i]);
		}
	}

	/**
	 * Observe a list of Array items.
	 */
	observeArray(items) {
		for (let i = 0, l = items.length; i < l; i++) {
			observe(items[i]);
		}
	}
}

export function observe(value, asRootData) {
	if (!isObject(value) || value instanceof VNode) {
		return;
	}
	let ob;
	if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
		ob = value.__ob__;
	} else if (
		shouldObserve &&
		(Array.isArray(value) || isPlainObject(value)) &&
		Object.isExtensible(value) &&
		!value._isVue
	) {
		ob = new Observer(value);
	}
	if (asRootData && ob) {
		ob.vmCount++;
	}
	return ob;
}
