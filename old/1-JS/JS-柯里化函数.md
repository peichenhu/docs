# JS-柯里化函数

请实现以下代码中的的 `curry` 函数：

```js
var add = (a = 0, b = 0) => {
    console.count("add 执行次数：");
    return a + b;
};
var curryAdd = curry(add);

console.log(curryAdd(1)); // 1
console.log(curryAdd(2)); // 3
console.log(curryAdd(3, 4)); // 10
console.log(curryAdd(1, 2, 3, 4)); // 20
```

分析：

-   `curry` 接收 add 函数 并返回一个 `curryAdd` 函数 ，那么 `curry` 就是一个`闭包`
-   `curryAdd` 不断收到参数， 并返回所有收到过的参数的和，所以, `curryAdd` 一定利用`闭包`拥有着自己的缓存 (记忆 `memoization`)
-   `记忆`是为了加速程序计算，直接读计算过的结果，避免重复计算

实现：

```js
// 未优化，不带记忆功能
function curry(fn) {
    // curryAdd 缓存输入参数
    var params = [];
    // 返回闭包函数
    return function curryAdd(...args) {
        // curryAdd 新增缓存数据
        params = params.concat(args);
        // curryAdd 定义要的输出结果
        var sum;
        // curryAdd 使用缓存数据
        params.forEach((n) => {
            // curryAdd 计算要的输出结果
            sum = fn(sum, n);
        });
        // curryAdd 输出结果
        return sum;
    };
}
// 未优化，不带记忆功能，执行结果
// add 执行次数： 15
// 1
// 3
// 10
// 20

// 优化，带记忆功能
function curry(fn) {
    // curryAdd 缓存计算结果
    var sum;
    // 返回闭包函数
    return function curryAdd(...args) {
        // curryAdd 使用缓存数据
        args.forEach((n) => {
            // curryAdd 计算要的输出结果
            sum = fn(sum, n);
        });
        // curryAdd 输出结果
        return sum;
    };
}
// 优化，带记忆功能，执行结果
// add 执行次数： 8
// 1
// 3
// 10
// 20
```

思考：

-   为什么叫柯里化

是为了纪念数学家 HasKell Curry （例如 HasKell 编程语言也是为了纪念该数学家 ）

-   使用柯里化函数实现阶乘
-   使用柯里化函数实现斐波那次数列
-   柯里化函数还能做什么？
