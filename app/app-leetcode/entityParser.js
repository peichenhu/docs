/**
 * 题目标题     1410.HTML 实体解析器
 * 题目链接     https://leetcode.cn/problems/html-entity-parser/
 * 题目内容     「HTML 实体解析器」 是一种特殊的解析器，它将 HTML 代码作为输入，并用字符本身替换掉所有这些特殊的字符实体。
 * 题目思路     数据结构 + 算法
 * @param {string} text
 * @return {string}
 */
var entityParser = function (text) {
    const object = {
        "&quot;": '"',
        "&apos;": "'",
        "&amp;": "&",
        "&gt;": ">",
        "&lt;": "<",
        "&frasl;": "/",
    };
    text = text.replace(/&[a-z]+;/g, function (match) {
        return object[match] || match;
    });
    return text;
};
// 导出
module.export = entityParser;
// ==========================================
// ===> 测试用例
// 输入：text = "x &gt; y &amp;&amp; x &lt; y is always false"
// 输出："x > y && x < y is always false"
// ==========================================
console.log(entityParser("x &gt; y &amp;&amp; x &lt; y is always false"));
