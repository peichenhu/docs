// Promise.race(iterable)
// Promise.race 等待第一个兑现的结果。

function race(arr) {
	return new Promise((resolve, reject) => {
		// 是否存在 Promise 子项
		let hasPromise = false;

		arr.forEach((obj, idx) => {
			if (obj instanceof Promise) {
				hasPromise = true;
				// 先到先得
				obj.then(resolve, reject);
			}

			// 没有 Promise 子项，返回第一个子项
			if (idx === arr.length - 1 && !hasPromise) {
				resolve(arr[0]);
			}
		});
	});
}
