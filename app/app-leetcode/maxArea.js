/**
 * 题目标题     11.盛最多水的容器
 * 题目链接     https://leetcode.cn/problems/container-with-most-water/
 * 题目内容     给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 *             找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *             返回容器可以储存的最大水量。
 * 题目思路     数组相向双指针 + 贪心
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    /**
     * 局部最优：相向双指针，移动两侧边界中最矮的，尝试寻找比它大的，才能得到更大的容量
     * 全局最优：从所有解中找到一个最大的。
     */
    var area = 0,
        start = 0,
        end = height.length - 1;
    while (start < end) {
        // 在所有解中保留一个最大的
        let _area = Math.min(height[start], height[end]) * (end - start);
        area = Math.max(area, _area);
        // 核心：移动两侧边界中最矮的，尝试寻找比它大的，才能得到更大的容量
        if (height[start] < height[end]) {
            start++;
        } else {
            end--;
        }
    }
    return area;
}
// 导出
module.export = maxArea;
// ==========================================
// ===> 测试用例 1
// ==========================================
const nums = [1, 2, 3];
const res = maxArea(nums);
console.log(res);
