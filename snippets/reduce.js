// 语法规则
// [].reduce((res, cut, idx, this) => { return res; }, val);

// 模仿实现
function reduce(arr, callback, initValue) {
    let res = initValue;
    for (let i = 0; i < arr.length; i++) {
        let cut = arr[i];
        res = callback(res, cut, i, arr);
    }
    return res;
}

// 测试代码
const nums = [1, 2, 3];
const res = reduce(nums, (sum, value) => (sum += value), 0);
const res2 = nums.reduce((sum, value) => (sum += value), 0);
console.log(res === res2); // true
