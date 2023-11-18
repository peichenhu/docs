/**
 * 题目标题     118.杨辉三角
 * 题目链接     https://leetcode.cn/problems/pascals-triangle/
 * 题目内容     给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 *              在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 * 题目思路     数组 + 动态规划
 * @param {number} numRows
 * @return {number[][]}
 */
function pascalsTriangle(numRows) {
    /**
     * 第1/5步骤 确定DP数组
     *     | 0  1  2  ... m
     * ----+----------------
     *   0 | 1
     *   1 | 1  1
     *   2 | 1  2  1
     *  ...| 1  3  3  1
     *   n | 1  4  6  4  1
     *
     * 第2/5步骤 确定DP数组[i][j]的推导公式
     * line = [1, prevLine.map((val, idx) => prevLine[idx] + (prevLine[idx + 1] || 0))]
     *
     * 第3/5步骤 确定DP数组初始化
     * prevLine = [1]
     *
     * 第4/5步骤 确定DP数组循环结构和次数
     * for(let line = 1; line <= n; line ++)
     *      for(let m = 0; m <= line; m++)
     *
     * 第4/5步骤 确定DP数组循环结构和次数
     * 第5/5步骤 举例推导DP数组，快速验证全部步骤
     */
    let prevLine = [1];
    let dp = [prevLine];
    for (let line = 1; line <= numRows - 1; line++) {
        let line = [1];
        for (let m = 0; m < prevLine.length; m++) {
            line[m + 1] = prevLine[m] + (prevLine[m + 1] || 0);
        }
        prevLine = line;
        dp.push(line);
    }
    return dp;
}
// 导出
module.export = pascalsTriangle;
// ==========================================
// ===> 测试用例 
// ==========================================
const numRows = 5
const res = pascalsTriangle(numRows);
console.log(res);
