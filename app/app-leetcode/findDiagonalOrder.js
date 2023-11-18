/**
 * 题目标题     498. 对角线遍历
 * 题目链接     https://leetcode.cn/problems/diagonal-traverse/
 * 题目内容     给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。
 * 题目思路     矩阵 + 遍历
 * @param {number[][]} mat
 * @return {number[]}
 */
function findDiagonalOrder(mat) {
    let x_max = mat.length - 1; // x 最大值
    let y_max = mat[0].length - 1; // y 最大值
    let [x, y] = [0, 0]; // 起始索引
    let res = []; // 返回结果
    let isUp = true; // 起始方向
    // 准入判断
    while (x <= x_max && y <= y_max) {
        // 准入记录
        res.push(mat[x][y]);
        // 以 x 为边界的方向掉头处理(上下)
        if ((x === 0 && isUp) || (x === x_max && !isUp)) {
            // 方向掉头
            isUp = !isUp;
            if (y === y_max) x++;
            else y++;
            continue;
        }
        // 以 y 为边界的方向掉头处理(左右)
        if ((y === 0 && !isUp) || (y === y_max && isUp)) {
            // 方向掉头
            isUp = !isUp;
            if (x === x_max) y++;
            else x++;
            continue;
        }
        // 其他普通情况处理
        x = isUp ? x - 1 : x + 1;
        y = isUp ? y + 1 : y - 1;
    }
    // 返回结果
    return res;
}
// 导出
module.export = findDiagonalOrder;
// ==========================================
// ===> 测试用例
// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,4,7,5,3,6,8,9]
// 输入：mat = [[1,2],[3,4]]
// 输出：[1,2,3,4]
// ==========================================
const mat = [
    [1, 2],
    [3, 4],
];
const res = findDiagonalOrder(mat);
console.log(res);
// console.log(findDiagonalOrder([[1,2],[3,4]]));
