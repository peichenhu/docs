/**
 * 题目标题     455.分发饼干
 * 题目链接     https://leetcode.cn/problems/assign-cookies/
 * 题目内容
 * 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
 * 对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，
 * 都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。
 * 你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
 *
 * 题目思路     数组 + 贪心
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
function findContentChildren(g = [], s = []) {
    /**
     * 贪心
     * 局部最优策略：为每一个较大胃口的孩子找一个饼干
     * 结果最优策略：每一个饼干都物尽其用
     */
    let res = 0;
    g.sort((a, b) => b - a); // 非递增，胃口
    s.sort((a, b) => b - a); // 非递增，饼干
    let sIndex = 0;
    for (i = 0; i < g.length; i++) {
        // 每一个较大胃口
        if (g[i] <= s[sIndex]) {
            // 胃口 <= 饼干
            res++; // 给这个孩子一个饼干
            sIndex++; // 其他孩子去尝试下一个饼干
        }
    }
    return res;
}
// 导出
module.export = findContentChildren;
// ==========================================
// ===> 测试用例
// 输入: g = [1,2,3], s = [1,1]
// 输出: 1
// 输入: g = [1,2], s = [1,2,3]
// 输出: 2
// ==========================================
// const g = [1, 2, 3];
// const s = [1, 1];
// const res = findContentChildren(g, s);
// console.log(res);
console.log(findContentChildren([1, 2, 3], [1, 1]));
console.log(findContentChildren([1, 2], [1, 2, 3]));
