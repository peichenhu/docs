// Promise.all(iterable)
// Promise.all 等待所有兑现（或第一个拒绝）的结果。

function all(arr = []) {
	return new Promise((resolve, reject) => {
		let resolveList = [];
		let resolveCount = 0;

		function insertResolveList(idx, val) {
			resolveList[idx] = val;
			resolveCount++;
			if (resolveCount === arr.length) resolve(resolveList);
		}

		arr.forEach((obj, idx) => {
			if (obj instanceof Promise) {
				obj.then(
					(val) => insertResolveList(idx, val), // 收集 resolve 结果
					(err) => reject(err) // 直接输出 reject 结果
				);
			} else {
				insertResolveList(idx, val); // 原始值，收集原始值
			}
		});
	});
}
