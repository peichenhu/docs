/**
 * 题目标题     912. 排序数组
 * 题目链接     https://leetcode.cn/problems/sort-an-array/
 * 题目内容     给你一个整数数组 nums，请你将该数组升序排列。
 * 题目思路     数组 + 排序
 * @param {number[]} nums
 * @returns {number[]}
 */
// 冒泡
function sortArray(nums) {
    let n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 1; j < n - i; j++) {
            if (nums[j - 1] > nums[j]) {
                [nums[j - 1], nums[j]] = [nums[j], nums[j - 1]];
            }
        }
    }
    return nums;
}
// 快排
function sortArray2(nums) {
    // 折半
    function loop(left, right) {
        if (left < right) {
            let mid = get(left, right);
            loop(left, mid - 1); // @注意
            loop(mid + 1, right); // @注意
        }
    }

    function get(left, right) {
        let mid = left;
        let min = left + 1;
        // @注意
        for (let i = min; i <= right; i++) {
            // @注意
            if (nums[i] < nums[mid]) {
                swap(i, min);
                min++;
            }
        }
        swap(mid, min - 1);
        return mid;
    }

    function swap(a, b) {
        let tem = nums[a];
        nums[a] = nums[b];
        nums[b] = tem;
    }

    loop(0, nums.length - 1);
    return nums;
}
// 导出
module.export = sortArray;
// ==========================================
// ===> 测试用例
// 输入: nums = [2,1,3]
// 输出: [1,2,3]
// ==========================================
const nums = [1, 23, 414, 15, 15, 1, 51, 51, 1, 2];
console.log("冒泡", sortArray(nums));
console.log("快排", sortArray2(nums));
