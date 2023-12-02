// 抽数逻辑：从 total 个中抽取不重复的 n 个数字
// 解题思路：洗牌 + 限制随机数区间，每一次抽数都有效，适合所有情况

function isolate(total = 100, n = 10) {
	// 创建列表
	function createList(length) {
		let list = new Array(length).fill(1);
		return list.map((value, index) => value + index);
	}
	// 创建区间内随机数
	function random(min, max) {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
	}
	const ans = [];
	const list = createList(total);
	for (let i = 0; i < n; i++) {
		// 创建随机索引 [i ~ total - 1]
		let j = random(i, total - 1);
		// 保存抽数
		ans.push(list[j]);
		// 将抽数移动到前面，避免下一次重复取值（也可以 splice 直接提取）
		[list[j], list[i]] = [list[i], list[j]];
	}

	// return list.slice(0, n);
	return ans;
}

console.log('isolate', isolate(100, 4).join());

for (let i = 0; i < 5; i++) {
	const ans = isolate(10, 10);
	console.log('isolate', ans.join());
}

// isolate 97,31,46,44
// isolate 8,4,1,2,7,10,3,9,5,6
// isolate 8,10,4,2,5,6,9,3,7,1
// isolate 3,9,5,1,7,4,8,6,2,10
// isolate 6,9,8,1,4,7,2,10,3,5
// isolate 9,6,10,5,3,8,1,7,2,4
