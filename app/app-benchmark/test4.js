// ==========================================
// ===> 基准测试 Benchmark
// ==========================================

const benchmark = require("./benchmark");

// const case1 = function () {};

function case1(versions) {
    let n = versions.length;
    let cache = {};
    let i;
    let j;
    for (i = 0; i < n - 1; i++) {
        for (j = 1; j < n - i; j++) {
            if (compare(versions[j - 1], versions[j])) {
                [versions[j - 1], versions[j]] = [versions[j], versions[j - 1]];
            }
        }
    }
    function compare(v1, v2) {
        let l1 = cache[v1] || v1.split(".").map(Number);
        let l2 = cache[v2] || v2.split(".").map(Number);
        cache[v1] = l1;
        cache[v2] = l2;
        let n = Math.max(l1.length, l2.length);
        let i;
        for (i = 0; i < n; i++) {
            if ((l1[i] || 0) === l2[i]) continue;
            return (l1[i] || 0) > l2[i];
        }
        return false;
    }

    return versions;
}

function case2(versions) {
    return versions.sort((a, b) => {
        const tempA = a.split(".");
        const tempB = b.split(".");
        const maxLen = Math.max(tempA.length, tempB.length);
        for (let i = 0; i < maxLen; i++) {
            const valueA = +tempA[i] || 0;
            const valueB = +tempB[i] || 0;
            if (valueA === valueB) continue;
            return valueA - valueB;
        }
        return 0;
    });
}

// const data = null;
const data = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
// console.log(case1(data));
// console.log(case2(data));
benchmark([case1, data], [case2, data]);
// case1 x 395,868 ops/sec ±0.53% (87 runs sampled)
// case2 x 639,179 ops/sec ±0.49% (88 runs sampled)
// complete: [ 'case2' ] is fastest!
