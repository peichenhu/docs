/**
 * 题目标题     165.比较版本号
 * 题目链接     https://leetcode.cn/problems/compare-version-numbers/
 * 题目内容     给你两个版本号 version1 和 version2 ，请你比较它们。
 *             如果 version1 > version2 返回 1，
 *             如果 version1 < version2 返回 -1，
 *             除此之外返回 0。
 * 题目思路     数组 + 排序
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion(version1, version2) {
    const tempA = version1.split(".");
    const tempB = version2.split(".");
    const maxLen = Math.max(tempA.length, tempB.length);
    for (let i = 0; i < maxLen; i++) {
        const valueA = +tempA[i] || 0;
        const valueB = +tempB[i] || 0;
        if (valueA === valueB) continue;
        return valueA > valueB ? 1 : -1;
    }
    return 0;
}
// 导出
module.export = compareVersion;
// ==========================================
// ===> 测试用例
// 输入: nums = [1,2,3]
// 输出: 1
// ==========================================
const version1 = "1.01";
const version2 = "1.001";
const res = compareVersion(version1, version2);
console.log(res);
// console.log(compareVersion(version1, version2));
