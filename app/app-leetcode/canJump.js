/**
 * 题目标题     55. 跳跃游戏
 * 题目链接     https://leetcode.cn/problems/jump-game/
 * 题目内容     给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 *             判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 * 题目思路     数组 + 贪心
 * @param {number[]} nums
 * @returns {number[]}
 */
function canJump(nums) {
    /**
     * 局部最优：每次取最大跳跃步数（取最大覆盖范围），
     * 整体最优解：最后得到整体最大覆盖范围，看是否能到终点。
     */
    if (nums.length === 1) return true;
    let cover = 0;
    // 核心：i <= cover 表示下一步必须在覆盖范围内才可以继续
    for (let i = 0; i <= cover; i++) {
        cover = Math.max(cover, nums[i] + i);
        if (cover >= nums.length - 1) {
            return true;
        }
    }
    return false;
}
// 导出
module.export = canJump;
// ==========================================
// ===> 测试用例
// 输入：nums = [2,3,1,1,4]
// 输出：true
// 输入：nums = [3,2,1,0,4]
// 输出：false
// 输入：nums = [0,2,1]
// 输出：false
// ==========================================
// const nums = [1, 2, 3];
// const res = canJump(nums);
// console.log(res);
console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([0, 2, 1]));
