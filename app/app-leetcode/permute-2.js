/**
 * 题目标题     全排列
 * 题目链接     https://leetcode.cn/problems/permutations/description/
 * 题目内容     给定一个不含重复数字的数组 nums，返回其所有可能的全排列。你可以按任意顺序返回答案。
 * 题目思路     回溯；递归；N叉树；
 * @param {number[]} nums
 * @returns {number[][]}
 */
function permute(nums) {
    let res = [];
    function loop(arr, used) {
        if (arr.length && arr.length === nums.length) {
            return res.push(arr);
        }
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (used[num]) continue;
            loop(arr.concat([num]), Object.assign({ [num]: true }, used));
        }
    }
    loop([], {});
    return res;
}
// 导出
module.export = permute;
// ==========================================
// ===> 测试用例 1
// ==========================================
const nums = [1, 2, 3];
const res = permute(nums);
console.log(res);
