// 并发请求限制

function limitRequst(list, limit) {
	// 返回一个 Promise
	return new Promise((resolve) => {
		let pending = 0; // 待定状态任务数量
		let resultList = new Array(list.length); // 任务结果
		let taskList = list.map((task, index) => ({ index, task })); // 任务列表(记录任务索引，用以保证任务结果顺序)

		request();

		function request() {
			const subList = taskList.splice(0, limit - pending); // 提取待处理任务
			const subListPatched = patch(subList); // 修补待处理任务
			pending += subListPatched.length; // 更新待定状态任务数量
			// 并发任务
			Promise.allSettled(subListPatched).then((resList) => {
				// 收集任务结果 (保持原始顺序)
				resList.forEach((res, idx) => {
					const index = subList[idx].index;
					resultList[index] = res;
				});
				// 结果全部完成判定，并返回任务结果
				if (!resultList.includes(undefined)) {
					resolve(resultList);
				}
			});
		}

		// 修补待处理任务
		function patch(list = []) {
			return list.map(({ task }) => {
				// 非正常任务修补
				if (task instanceof Promise === false) {
					task = Promise.resolve(task); // 修补
				}
				// 捕获单任务的最终状态
				task.finally(() => {
					pending--; // 更新待定状态任务数量
					request(); // 处理剩余任务
				}).catch(() => {
					// 您的 Promise 必须自己处理 catch 情况，
					// 此处 catch 只是为了保证方法能正常运行，但对 catch 结果不做处理。
				});
				return task;
			});
		}
	});
}

function createPromise() {
	return new Promise((resolve, reject) => {
		if (Math.random() > 0.5) {
			setTimeout(() => {
				resolve('resolve');
			}, 500);
		} else {
			setTimeout(() => {
				reject(new Error('reject'));
			}, 500);
		}
	});
}

const list = [createPromise(), createPromise(), 1, createPromise(), createPromise(), null];

limitRequst(list, 3).then((list) => {
	console.log('list', list.length, list);
});

// 控制台输出：
// list 6 [
//     { status: 'fulfilled', value: 'resolve' },
//     {
//       status: 'rejected',
//       reason: Error: reject
//           at Timeout._onTimeout (/Users/pch/Documents/GitHub/test.js:65:24)
//           at listOnTimeout (node:internal/timers:559:17)
//           at processTimers (node:internal/timers:502:7)
//     },
//     { status: 'fulfilled', value: 1 },
//     { status: 'fulfilled', value: 'resolve' },
//     {
//       status: 'rejected',
//       reason: Error: reject
//           at Timeout._onTimeout (/Users/pch/Documents/GitHub/test.js:65:24)
//           at listOnTimeout (node:internal/timers:559:17)
//           at processTimers (node:internal/timers:502:7)
//     },
//     { status: 'fulfilled', value: null }
//   ]
