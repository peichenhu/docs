/**
 * 题目标题     509. 斐波那契数
 * 题目链接     https://leetcode.cn/problems/fibonacci-number/
 * 题目内容     斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。
 *              该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
 * 题目思路     整数 + 动态规划
 * @param {number[]} nums
 * @returns {number[]}
 */
function fib(n) {
    const list = [0];
    for (let i = 1; i <= n; i++) {
        list.push((list[i - 1] ?? 1) + (list[i - 2] ?? 1));
    }
    return list[n];
}
// 导出
module.export = fib;
// ==========================================
// ===> 测试用例 1
// ==========================================
const n = 5;
const res = fib(n);
console.log(res);
