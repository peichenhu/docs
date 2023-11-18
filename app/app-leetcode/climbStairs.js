/**
 * 题目标题     70. 爬楼梯
 * 题目链接     https://leetcode.cn/problems/climbing-stairs/
 * 题目内容     假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 *              每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 题目思路     数字递推 + 动态规划
 * @param {number} nums
 * @returns {number}
 * 1 <= n <= 45
 */
function climbStairs(n) {
    /**
     * 1    1
     * 2    11 2
     * 3    111 12 21
     * 4    111 112 121 211 22
     * n    count[n - 1] + count[n - 2]
     */
    const res = [1];
    for (let i = 1; i < n; i++) {
        res[i] = (res[i - 1] ?? 1) + (res[i - 2] ?? 1);
    }
    return res[res.length - 1];
}
// 导出
module.export = climbStairs;
// ==========================================
// ===> 测试用例 1
// ==========================================
// const n = 2
// const res = climbStairs(n);
// console.log(res);
console.log(climbStairs(1));
console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(4));
console.log(climbStairs(5));
