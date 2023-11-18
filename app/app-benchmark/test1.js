// ==========================================
// ===> 基准测试 Benchmark
// ==========================================

const benchmark = require("./benchmark");

const case1 = function (nums) {
    let res = [];
    function loop(arr, used) {
        if (arr.length && arr.length === nums.length) {
            return res.push(arr);
        }
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (used[num]) continue;
            loop(arr.concat([num]), Object.assign({ [num]: true }, used));
        }
    }
    loop([], {});
    return res;
};

const case2 = function (nums) {
    const res = [];
    const used = {};

    function dfs(path) {
        if (path.length == nums.length) {
            // 个数选够了
            res.push(path.slice()); // 拷贝一份path，加入解集res
            return; // 结束当前递归分支
        }
        for (const num of nums) {
            // for枚举出每个可选的选项
            // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度
            if (used[num]) continue; // 使用过的，跳过
            path.push(num); // 选择当前的数，加入path
            used[num] = true; // 记录一下 使用了
            dfs(path); // 基于选了当前的数，递归
            path.pop(); // 上一句的递归结束，回溯，将最后选的数pop出来
            used[num] = false; // 撤销这个记录
        }
    }

    dfs([]); // 递归的入口，空path传进去
    return res;
};

const data = [1, 2, 3, 4, 5, 6];

benchmark([case1, data], [case2, data]);

// ==========================================
// ===> [1, 2, 3, 4, 5, 6]
// case1 x 391 ops/sec ±0.67% (83 runs sampled)
// case2 x 8,836 ops/sec ±0.63% (90 runs sampled)
// complete: [ 'case2' ] is fastest!
// ==========================================