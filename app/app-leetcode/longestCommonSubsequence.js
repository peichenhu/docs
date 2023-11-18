/**
 * 题目标题     1143. 最长公共子序列
 * 题目链接     https://leetcode.cn/problems/longest-common-subsequence/
 * 题目内容     给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 *             一个字符串的 子序列 是指这样一个新的字符串：
 *             它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 *             例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 *             两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 * 题目思路     双循环递推 + 动态规划
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
    /**
     * 第1/5步骤 确认 DP 数组
     * text1=ababdc;text2=abcde
     * ---------------------
     * n\m|  a  b  c  d  e
     * ---+----------------+
     *  f |  1  1  1  1  1 |
     *  b |  1  2  2  2  2 |
     *  a |  1  2  2  2  2 |
     *  b |  1  2  2  2  2 |
     *  d |  1  2  2  3  3 |
     *  c |  1  2  3  3  3 |
     *
     * 第2/5步骤 确认 DP 数组的递推公式
     * sm === sn => dp[m][n] = dp[m-1][n-1] + 1
     * sm !== sn => dp[m][n] = Math.max(dp[m-1][n], dp[m][n-1])
     *
     * 第3/5步骤 确认 DP 数组的初始化
     * dpm = new Array(m + 1).fill(0)
     * dp = new Array(n + 1).fill(dpm.slice())
     *
     * 第4/5步骤 确认 DP 数组的循环结构和次数
     * m = text1.length
     * n = text2.length
     * for (let i = 1; i <= m; i++)
     *      for (let j = 1; j <= m; j++)
     *          t1 = text1[i - 1]
     *          t2 = text1[j - 1]
     *
     * 第5/5步骤 确认 DP 数组的举例推演
     */
    const m = text1.length;
    const n = text2.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const c1 = text1[i - 1];
            const c2 = text2[j - 1];
            if (c1 === c2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
// 导出
module.export = longestCommonSubsequence;
// ==========================================
// ===> 测试用例 1
// ==========================================
const text1 = "abcde";
const text2 = "ace";
const res = longestCommonSubsequence(text1, text2);
console.log(res);
