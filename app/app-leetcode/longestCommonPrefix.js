/**
 * 题目标题     14.最长公共前缀
 * 题目链接     https://leetcode.cn/problems/longest-common-prefix/
 * 题目内容     编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
 * 题目思路     字符串 + 遍历
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    let i = 0;
    let ans = "";
    while (true) {
        let c = strs[0][i];
        let allPass = true;
        for (let j = 0; j < strs.length; j++) {
            let str = strs[j];
            if (!str[i] || str[i] !== c) {
                allPass = false;
                break;
            }
        }
        if (allPass) {
            ans += c;
            i++;
        } else {
            return ans;
        }
    }
}
// 导出
module.export = longestCommonPrefix;
// ==========================================
// ===> 测试用例
// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// ==========================================
const nums = ["flower", "flow", "flight"];
const res = longestCommonPrefix(nums);
console.log(res);
// console.log(longestCommonPrefix([1, 2, 3]));
