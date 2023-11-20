// 版本一
function curry(fn) {
    let allArg = [];
    return function curryFn(...args) {
        allArg = allArg.concat(args);
        if (allArg.length < fn.length) return curryFn;
        return fn(...allArg);
    };
}

// 版本二
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }
        return (...args2) => curried.apply(this, args.concat(args2));
    };
}

// 示例函数
function add(a, b, c) {
    return a + b + c;
}

// 使用柯里化转换示例函数
const curriedAdd = curry(add);
console.log(curriedAdd(1, 2, 3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2)(3)); // 6

let curriedAdd2 = curry(add);
curriedAdd2 = curriedAdd2(1);
curriedAdd2 = curriedAdd2(2);
console.log(curriedAdd2(3)); // 6
