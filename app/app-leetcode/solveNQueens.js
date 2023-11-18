/**
 * 题目标题     51. N 皇后
 * 题目链接     https://leetcode.cn/problems/n-queens/
 * 题目内容     按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
 *             n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *             给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 * 题目思路     矩阵 + 回溯
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
    let ans = [];
    let usedCol = {};
    function loop(rcList = [], row = 0) {
        if (rcList.length === n) {
            let list = rcList.slice();
            list = list.map((val) => {
                let arr = new Array(n).fill(".");
                arr[val[1]] = "Q";
                return arr.join("");
            });
            ans.push(list);
            return;
        }
        const isValid = function (rcList, r, c) {
            for (let i = 0; i < rcList.length; i++) {
                if (r - rcList[i][0] === Math.abs(c - rcList[i][1])) {
                    return false; // 不同斜线
                }
            }
            return true;
        };
        for (let col = 0; col < n; col++) {
            // 处理元素
            if (usedCol[col]) continue; // 不同列
            if (!isValid(rcList, row, col)) continue; // 不同斜线
            rcList.push([row, col]);
            usedCol[col] = true;
            // 递归处理
            loop(rcList, row + 1); // 不同行
            // 回溯处理
            rcList.pop([row, col]);
            delete usedCol[col];
        }
    }
    loop();
    return ans;
}
// 导出
module.export = solveNQueens;
// ==========================================
// ===> 测试用例
// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 输入：n = 1
// 输出：[["Q"]]
// ==========================================
// const nums = [1, 2, 3];
// const res = solveNQueens(nums);
// console.log(res);
console.log(solveNQueens(1));
console.log(solveNQueens(3));
console.log(solveNQueens(4));
