// ==========================================
// ===> 基准测试 Benchmark
// ==========================================

const benchmark = require("./benchmark");

// const case1 = function () {};

// const case2 = function () {};

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 相邻元素两两对比
                var temp = arr[j + 1]; // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                // 寻找最小的数
                minIndex = j; // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) {
        //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

function mergeSort(arr) {
    // 采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}

function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != "number" ? 0 : left,
        right = typeof right != "number" ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {
    // 分区操作
    var pivot = left, // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0;
    (arrLen = arr.length), (bucketLen = maxValue + 1);

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}

function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
        return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i]; // 输入数据的最小值
        } else if (arr[i] > maxValue) {
            maxValue = arr[i]; // 输入数据的最大值
        }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5; // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]); // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}

const data = null;

var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for (var j = 0; j < counter.length; j++) {
            var value = null;
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function swap(arr, i, j) {
    // console.log(i, j, arr.length);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var sortArray = function (nums) {
    nums.sort((a, b) => a - b);

    function qsort(arr, l, u) {
        if (l >= u) {
            return;
        }

        swap(arr, l, getRandomInt(l, u));

        let t = arr[l];
        let i = l;
        let j = u + 1;

        while (true) {
            do i++;
            while (i <= u && arr[i] < t);

            do j--;
            while (arr[j] > t);

            if (i > j) {
                break;
            }
            swap(arr, i, j);
        }

        swap(arr, l, j);
        qsort(arr, l, j - 1);
        qsort(arr, j + 1, u);
    }

    qsort(nums, 0, nums.length - 1);

    return nums;
};

// ==========================================
// ===> 参数一致
// ==========================================
let n = 10;
let list = new Array(n).fill(1);
list.map((i) => getRandomInt(0, n));
benchmark(
    // CASE LIST
    [bubbleSort, list],
    [selectionSort, list],
    [insertionSort, list],
    [shellSort, list],
    [mergeSort, list],
    [quickSort, list],
    [countingSort, list],
    [bucketSort, list],
    [radixSort, list],
    [sortArray, list]
);

// ==========================================
// ===> n = 10000
// bubbleSort x 8.17 ops/sec ±4.70% (25 runs sampled)
// selectionSort x 8.67 ops/sec ±2.11% (26 runs sampled)
// insertionSort x 33,521 ops/sec ±0.46% (88 runs sampled)
// shellSort x 2,572 ops/sec ±0.61% (88 runs sampled)
// mergeSort x 150 ops/sec ±1.45% (74 runs sampled)
// quickSort:
// countingSort:
// bucketSort x 5,531 ops/sec ±0.83% (87 runs sampled)
// radixSort x 42,459,515 ops/sec ±0.85% (87 runs sampled)
// sortArray x 1,253 ops/sec ±0.66% (86 runs sampled)
// complete: [ 'radixSort' ] is fastest!
// ==========================================

// ==========================================
// ===> n = 10
// bubbleSort x 7,122,559 ops/sec ±0.60% (87 runs sampled)
// selectionSort x 6,538,329 ops/sec ±0.59% (91 runs sampled)
// insertionSort x 23,277,260 ops/sec ±0.66% (90 runs sampled)
// shellSort x 9,619,907 ops/sec ±0.57% (90 runs sampled)
// mergeSort x 732,352 ops/sec ±0.53% (84 runs sampled)
// quickSort x 3,800,420 ops/sec ±0.47% (87 runs sampled)
// countingSort:
// bucketSort x 3,828,571 ops/sec ±0.50% (88 runs sampled)
// radixSort x 42,760,024 ops/sec ±0.74% (87 runs sampled)
// sortArray x 1,490,771 ops/sec ±0.81% (86 runs sampled)
// complete: [ 'radixSort' ] is fastest!
// ==========================================
