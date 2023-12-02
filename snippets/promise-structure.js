/**
 * 术语
 * “promise” 是一个对象或函数，其 then 方法的行为符合本规范。
 * “thenable” 是定义 then 方法的对象或函数。
 * “value” 是任何合法的 JavaScript 值（包括undefined、thenable 或 promise）。
 * “异常” 是使用 throw 语句抛出的值。
 * “reason” 是一个值，表示承诺被拒绝的原因。
 */

const PENDING = '待定状态';
const RESOLVED = '已完成状态';
const REJECTED = '已拒绝状态';
const noop = (v) => v;
const noopErr = (e) => {
	throw e;
};
const isFn = (v) => typeof v === 'function';
const isObj = (v) => typeof v === 'object';

class Promise {
	constructor(callback) {
		this.value = undefined; // 任何合法的 JavaScript 值（包括undefined、thenable 或 promise）。
		this.reason = undefined; // 一个值，表示承诺被拒绝的原因。
		this.status = PENDING; // 当未决时，承诺：待定
		this.resolvedFnList = []; // 已完成状态的回调函数列表
		this.rejectedFnList = []; // 已拒绝状态的回调函数列表

		const resolve = (value) => {
			if (this.status === PENDING) {
				this.status = RESOLVED;
				this.value = value;
				this.resolvedFnList.forEach((fn) => fn());
			}
		};

		const reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED;
				this.reason = reason;
				this.rejectedFnList.forEach((fn) => fn());
			}
		};

		try {
			callback(resolve, reject); // 主函数立即执行
		} catch (error) {
			reject(error);
		}
	}
	static resolve(v) {
		return v instanceof Promise ? v : new Promise((res, rej) => res(v));
	}
	static reject(v) {
		return v instanceof Promise ? v : new Promise((res, rej) => rej(v));
	}
	static all(arr) {}
	static race(arr) {}
	then(onResolved, onRejected) {}
	catch(onCatchFn) {
		this.then(undefined, onCatchFn);
	}
	/**
	 * 不管成功还是失败，都会走到 finally 中,
	 * 并且 finally 之后，还可以继续 then。并且会将值原封不动的传递给后面的 then.
	 */
	finally(callback) {
		const resolve = (value) => {
			const res = callback();
			return Promise.resolve(res).then(() => value);
		};
		const reject = (reason) => {
			const res = callback();
			return Promise.resolve(res).then(() => {
				throw reason;
			});
		};
		return this.then(resolve, reject);
	}
}
