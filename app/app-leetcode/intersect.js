/**
 * 题目标题     350.两个数组的交集 II
 * 题目链接     https://leetcode.cn/problems/intersection-of-two-arrays-ii/
 * 题目内容     给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 *             返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。
 *             可以不考虑输出结果的顺序。
 * 题目思路     数组 + 双指针
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersect(nums1, nums2) {
    const ans = [];
    let min, max;
    if (nums1.length < nums2.length) {
        min = nums1;
        max = nums2;
    } else {
        min = nums2;
        max = nums1;
    }
    min.sort((a, b) => a - b);
    max.sort((a, b) => a - b);
    let i = 0,
        j = 0;

    while (i < min.length && j < max.length) {
        if (min[i] < max[j]) {
            i++;
            continue;
        }
        if (min[i] > max[j]) {
            j++;
            continue;
        }
        ans.push(min[i]);
        i++;
        j++;
    }
    return ans;
}
// 导出
module.export = intersect;
// ==========================================
// ===> 测试用例
// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[4,9]
// ==========================================

let l1 = [4, 9, 5];
let l2 = [9, 4, 9, 8, 4];
const res = intersect(l1, l2);
console.log(res);
// console.log(intersect([4,9,5], [9,4,9,8,4]));
