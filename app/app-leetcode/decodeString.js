/**
 * 题目标题     394.字符串解码
 * 题目链接     https://leetcode.cn/problems/decode-string/
 * 题目内容
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 * 题目思路     正则; 字符串遍历；递归；
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
    let isNum = (c) => !isNaN(+c);

    function decode(prev, num, inner) {
        // console.log(prev, num, inner);
        let list = new Array(+num).fill(inner);
        let next = list.join("");
        return prev + next;
    }

    function loop(s, left) {
        if (!s.includes("[")) return s;
        let prev = "";
        let num = "";
        let inner = "";
        let sum = 0;
        let flag = false; // 是否正在匹配完整[]
        for (let i = left; i < s.length; i++) {
            let c = s[i];
            if (!flag) {
                if (isNum(c)) {
                    num += c;
                } else if (c === "[") {
                    flag = true;
                    inner += c;
                    sum++;
                } else {
                    prev += c;
                }
            } else {
                c === "[" && sum++;
                c === "]" && sum--;
                inner += c;
                if (sum === 0) {
                    // 处理 inner
                    inner = inner.slice(1, inner.length - 1);
                    let innerDecode = decode(prev, num, loop(inner, 0));
                    // 处理 outer
                    let outer = s.slice(i + 1);
                    let outerDecode = loop(outer, 0);
                    // 最终结果
                    return innerDecode + outerDecode;
                }
            }
        }
    }
    return loop(s, 0);
}
// 正则表达式方法
function decodeString2(s) {
    // 解析表达式 /(\d*)\[([^\[\]]*)\]/ 的过程：
    // const reg_group_1 = `(\\d*)`;
    // const reg_group_2 = `([^\\[\\]]*)`;
    // const reg_match = `${reg_group_1}\\[${reg_group_2}\\]`;
    // const reg = new RegExp(reg_match)
    const [self, times, str] = s.match(/(\d*)\[([^\[\]]*)\]/) || [];
    if (self) {
        const inner = Array(+times).fill(str).join("");
        return decodeString(s.replace(self, inner));
    }
    return s;
}
// 导出
module.export = decodeString;
// module.export = decodeString2;
// ==========================================
// ===> 测试用例
// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"
// 输入：s = "3[a2[c]]"
// 输出："accaccacc"
// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"
// 输入：s = "abc3[cd]xyz"
// 输出："abccdcdcdxyz"
// ==========================================
console.log(decodeString("3[a]2[bc]") === "aaabcbc");
console.log(decodeString("2[abc]3[cd]ef") === "abcabccdcdcdef");
console.log(decodeString("3[a2[c]]") === "accaccacc");
const r = "abcbcbcbcbcbcbcbcbcbcabcbcbcbcbcbcbcbcbcbcabcbcbcbcbcbcbcbcbcbc";
console.log(decodeString("3[a10[bc]]") === r);
