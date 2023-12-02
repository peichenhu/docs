const noop = (v) => v;
const noopErr = (e) => {
	throw e;
};
const isFn = (v) => typeof v === 'function';
const isObj = (v) => typeof v === 'object';
const PENDING = '待定状态';
const RESOLVED = '已完成状态';
const REJECTED = '已拒绝状态';

function then(onResolved, onRejected) {
	// onResolved 可选，可能是 Promise、fn 等，非函数忽略，使用 noop 函数 向下传递 value
	onResolved = isFn(onResolved) ? onResolved : noop;
	// onRejected 可选，可能是 Promise、fn 等，非函数忽略，使用 noopErr 函数向下传递 reason
	onRejected = isFn(onRejected) ? onRejected : noopErr;
	// 承诺解决程序
	const resolvePromise = (promise2, x, resolve, reject) => {
		// 如果 promise 和 x 引用同一个对象，以 TypeError 为理由拒绝。
		if (promise2 === x) return reject(new TypeError('TypeError'));
		// 2.3.3.3.3 如果同时调用resolvePromise和rejectPromise，或者多次调用同一个参数，则第一个调用优先，任何进一步的调用都将被忽略。
		let called = false;
		// 2.3.3 如果 x 是一个非 null 的对象或函数
		if ((isObj(x) && x !== null) || isFn(x)) {
			try {
				// 3.5
				// 这个首先存储对 的引用x.then，然后测试该引用，然后调用该引用的过程避免了对该x.then属性的多次访问。
				// 这些预防措施对于确保访问器属性的一致性很重要，访问器属性的值可能会在检索之间发生变化。
				let then = x.then;
				if (isFn(then)) {
					then.call(
						x,
						(y) => {
							if (called) return;
							called = true;
							// 递归（ 可能promise 嵌套）
							resolvePromise(promise2, y, resolve, reject);
						},
						(z) => {
							if (called) return; // 只要失败就失败
							called = true;
							reject(z);
						}
					);
				} else {
					// 2.3.3.4 如果 then 不是一个函数，用 x 完成 promise。
					resolve(x);
				}
			} catch (e) {
				// 2.3.3.2 抛出的异常的结果 e，e 作为拒绝 promise 的原因。
				if (called) return;
				called = true;
				reject(e);
			}
		} else {
			resolve(x);
		}
	};

	const promise2 = new Promise((resolve, reject) => {
		if (this.status === RESOLVED) {
			queueMicrotask(() => {
				try {
					let x = onResolved(this.value);
					resolvePromise(promise2, x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
		}
		if (this.status === REJECTED) {
			queueMicrotask(() => {
				try {
					let x = onRejected(this.reason);
					resolvePromise(promise2, x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
		}
		if (this.status === PENDING) {
			this.resolvedFnList.push(() => {
				queueMicrotask(() => {
					try {
						let x = onResolved(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			});
			this.rejectedFnList.push(() => {
				queueMicrotask(() => {
					try {
						let x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			});
		}
	});
	// 2.2.7 then必须返回一个承诺
	return promise2;
}
