/**
 * 题目标题     全排列 II
 * 题目链接     https://leetcode.cn/problems/permutations-ii/
 * 题目内容     给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 题目思路     数组 + 回溯算法 + 非递减数组 + 备忘录 + 相邻元素比较
 * @param {number[]} nums
 * @returns {number[]}
 */
function permuteUnique(nums) {
    nums.sort((a, b) => a - b);
    let res = [];
    let used = {};

    function backTracking(arr) {
        // 终止条件
        if (arr.length === nums.length) {
            res.push(arr.slice());
            return;
        }
        // 遍历元素
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                // 去重核心: 相邻的两项相等，
                //          前一个在 useed 中，说明还未被回溯，此时考虑的是上下级关系，不需要跳出
                //          前一个已经不在 useed 中，说明前一个已经被使用且被回溯，后一个去重跳出
                continue;
            }
            if (!used[i]) {
                // 处理元素
                used[i] = true;
                arr.push(num);
                backTracking(arr); // 递归操作
                arr.pop(); // 回溯操作
                delete used[i]; // 回溯操作
            }
        }
    }

    backTracking([]);

    return res;
}
// 导出
module.export = permuteUnique;

// ==========================================
// ===> 测试用例 1
// ==========================================

const nums = [1, 1, 2];
const res = permuteUnique(nums);
console.log(res);

// 输入：nums = [1,1,2]
// 输出：[[1,1,2], [1,2,1], [2,1,1]]
