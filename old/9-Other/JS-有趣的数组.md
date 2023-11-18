# JS-有趣的数组

## 多维数组的维度问题

> 给出一个任意维度的数组，例如 [1,[2,[3]],[2],[2,[3,[4]]],1]，获取当前数组的最大维度。

```js
// 思路 递归是必须的，一层一层的去删除，删到最后成为一维数组，删除多少层就是要获取当前数组的最大维度。简称洋葱算法吧。
var arrayDeep = function(arr, deepIndex) {
    var tmp = [], // 临时数组
        isDeep = false; // 是否有更深层的数组
    deepIndex = deepIndex || 1; // 默认传入数组从第一维度开始
    arr.forEach(function(item, index) {
        if (Object.prototype.toString.call(item) === '[object Array]') {
            tmp = tmp.concat(item);
            isDeep = true;
        }
    });
    return isDeep ? arrayDeep(tmp, ++deepIndex) : deepIndex;
};
var arr = [1, [2, [3]], [2], [2, [3, [4]]], 1];
console.log(arrayDeep(arr));
```
## 一维数组去重问题
```js
// ES6
//Array.from方法用于将两类对象转为真正的数组：
//   类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
var arr = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
console.log(arr);//  [1,2,3,4]

// ES5 排序 + 一次循环
Array.prototype.unique = function() {
    var tmp = [];
    this.sort();
    this.forEach(function(x, i, self) {
        if (i === 0 || x !== self[i - 1]) tmp.push(x);
    }); // this 重点
    return tmp;
};
var arr = [1, 2, 2, 4];
console.log(arr.unique()); //  [1,2,4]

// ES5 双层循环
Array.prototype.distinct = function() {
  var result = [];
  for (var i = 0, len = this.length; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (this[i] === this[j]) j = ++i; // ++i 跳过当前相等的索引,i和j同时加一跳过
    }
    result.push(this[i]);
  }
  return result;
};
var arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
console.log(arra.distinct()); // [3, 4, 2, 1]

```

## 一维数组和多维数组的转换

```js
function treeData(lineArr, startPid = 0, tree = []) {
  function loop(arr, pid) {
    lineArr.forEach(item => {
      if (item.parent === pid) {
        arr.push({
          id: item.id,
          name: item.name,
          children: [],
        });
        loop(arr[arr.length - 1].children, item.id);
      }
    });
  }
  loop(tree, startPid);
  console.log(JSON.stringify({ array: tree }));
  return tree;
}
// 测试

var lineArr = [
  { id: 1, name: '一级', parent: 0 },
  { id: 2, name: '二级1', parent: 1 },
  { id: 3, name: '二级1-1', parent: 2 },
  { id: 4, name: '二级1-2', parent: 2 },
  { id: 5, name: '二级1-3', parent: 2 },
  { id: 6, name: '三级1-1-1', parent: 3 },
  { id: 7, name: '三级1-1-2', parent: 3 },
  { id: 8, name: '三级1-2-1', parent: 4 },
  { id: 9, name: '三级1-2-2', parent: 4 },
  { id: 10, name: '三级1-3-1', parent: 5 },
  { id: 11, name: '三级1-3-2', parent: 5 },
];
treeData(lineArr);

// 输出
[
  {
    "id": 1,
    "name": "一级",
    "children": [
      {
        "id": 2,
        "name": "二级1",
        "children": [
          {
            "id": 3,
            "name": "二级1-1",
            "children": [
              { "id": 6, "name": "三级1-1-1", "children": [] },
              { "id": 7, "name": "三级1-1-2", "children": [] }
            ]
          },
          {
            "id": 4,
            "name": "二级1-2",
            "children": [
              { "id": 8, "name": "三级1-2-1", "children": [] },
              { "id": 9, "name": "三级1-2-2", "children": [] }
            ]
          },
          {
            "id": 5,
            "name": "二级1-3",
            "children": [
              { "id": 10, "name": "三级1-3-1", "children": [] },
              { "id": 11, "name": "三级1-3-2", "children": [] }
            ]
          }
        ]
      }
    ]
  }
]


```


