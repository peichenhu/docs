// 抽数逻辑：从 total 个中抽取不重复的 n 个数字
// 解题思路：利用哈希集合去重，运行次数可能大于 n 次，适合 total 比较大的情况

function isolate2(total = 100, n = 10) {
	// 创建列表
	function createList(length) {
		let list = new Array(length).fill(1);
		return list.map((value, index) => value + index);
	}
	// 创建区间内随机数
	function random(min, max) {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
	}

	const ans = new Set();
	const list = createList(total);
	while (ans.size < n) {
		const index = random(0, total - 1);
		ans.add(list[index]);
	}
	return Array.from(ans);
}

console.log('isolate2', isolate2(100, 4).join());

for (let i = 0; i < 5; i++) {
	const ans = isolate2(10, 10);
	console.log('isolate2', ans.join());
}

// isolate2 50,45,8,54
// isolate2 9,2,3,8,4,7,6,1,10,5
// isolate2 6,3,4,1,10,8,2,5,7,9
// isolate2 10,2,6,4,3,7,1,8,9,5
// isolate2 1,9,8,4,5,7,10,2,3,6
// isolate2 8,10,6,9,3,1,4,7,2,5
