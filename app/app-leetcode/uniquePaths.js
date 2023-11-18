/**
 * 题目标题     不同路径
 * 题目链接     https://leetcode.cn/problems/unique-paths/
 * 题目内容     一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 *             机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 *             问总共有多少条不同的路径？
 * 题目思路     矩阵 + 动态规划
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

function uniquePaths(m, n) {
    /**
     * 解题步骤1. 确定dp数组（dp table）以及下标的含义
     * 初始化 |  1 2 3  ...  m
     * ------+--------------------------
     * 1     |  1 1 1  ...  1
     * 2     |  1 2 3  ...  (line[m - 1] || 0) + prevLine[m]
     * ...   |  1 3 6  ...  (line[m - 1] || 0) + prevLine[m]
     * n     |  1 4 10 ...  (line[m - 1] || 0) + prevLine[m]
     *
     * 解题步骤2. 确定递推公式
     * line[x] = (line[x - 1] || 0) + prevLine[x];
     *
     * 解题步骤3. dp数组如何初始化
     * let prevLine = new Array(m).fill(1);
     *
     * 解题步骤4. 确定遍历顺序
     * for (let y = 1; y < n; y++)
     *      for (let x = 0; x < m; x++)
     *
     * 解题步骤5. 举例推导dp数组
     */
    let prevLine = new Array(m).fill(1);
    let line = new Array(m);
    for (let y = 1; y < n; y++) {
        for (let x = 0; x < m; x++) {
            line[x] = (line[x - 1] || 0) + prevLine[x];
        }
        prevLine = line;
    }
    return line[line.length - 1] || 1;
}
// 导出
module.export = uniquePaths;
// ==========================================
// ===> 测试用例 1
// ==========================================
const m = 3;
const n = 7;
const res = uniquePaths(m, n);
console.log(res);

// 示例 1：
// 输入：m = 3, n = 7
// 输出：28
