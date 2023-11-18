---
sidebarDepth: 2
---

# JS-手写 Polyfill

> 事必躬亲，牢记于心

## 模拟 new

-   构造函数创建创建实例对象
-   实例对象拥有 `__proto__` 属性，指向构造函数的原型对象
-   构造函数至少执行一次
-   构造函数如果有返回值并且是对象直接返回，否则返回实例对象。

```js
// new 方法实现
if (!Function.prototype.new) {
    Function.prototype.new = function (...args) {
        // 创建实例对象
        var instance = {};
        // 构造函数创建的实例拥有 __proto__ 属性，指向构造函数的原型对象
        instance.__proto__ = this.prototype;
        // 构造函数至少执行一次，传递参数，传递 this,(这样 instance 上才会有 name 属性)。
        var obj = this.apply(instance, args);
        // 构造函数如果有返回值并且是对象直接返回，否则返回实例对象。
        return obj instanceof Object ? obj : instance;
    };
}
// 测试代码
function Super(name) {
    this.name = name;
    return 100;
    return () => 0;
    return {};
    return null;
    return "string";
    return false;
    return new Date();
}
Super.prototype.sayName = function () {
    return this.name;
};

// 原生 new
var sub2 = new Super("名字");
console.log(sub2);
console.log(sub2.name);
console.log(sub2.sayName && sub2.sayName());

// 自定义 new
var sub1 = Super.new("名字");
console.log(sub1);
console.log(sub1.name);
console.log(sub1.sayName && sub1.sayName());
```

## 模拟 bind

-   修改 this 指向，传递参数，返回函数
-   不涉及原型链

```js
// bind2 方法实现
var age = 99;
if (!Function.prototype.bind2) {
    Function.prototype.bind2 = function () {
        // 绑定对象
        var obj = arguments[0] || (typeof window !== "undefined" ? window : global);
        // 绑定参数
        var args = Array.prototype.slice.call(arguments, 1);
        // 保存当前函数对象，后续使用闭包函数访问它
        var fn = this;
        // 创建返回闭包函数
        function res() {
            return fn.apply(obj, args);
        }
        // 返回闭包函数作为构造函数使用兼容 prototype 继承
        res.prototype = Object.create(fn.prototype);
        // 返回闭包函数
        return res;
    };
}
// 测试代码
function Super(name) {
    this.name = name;
    return this;
}
Super.prototype.sayInfo = function () {
    return {
        name: this.name,
        age: this.age
    };
};

// 原生 new
var sub2 = Super.bind(null, "原生");
console.log(sub2());
console.log(sub2().name);
console.log(sub2().age);
console.log(sub2.sayInfo && sub2.sayInfo());

// 自定义 new
var sub1 = Super.bind2(null, "自定义");
console.log(sub1());
console.log(sub1().name);
console.log(sub1().age);
console.log(sub1.sayInfo && sub1.sayInfo());
```

## 模拟 apply

-   绑定对象查找，兼容处理全局变量
-   绑定对象关联方法， 切换 this 指向
-   eval 调用关联方法，拼接 arguments 参数传参
-   绑定对象解绑关联方法，还原绑定对象

```js
// call 方法实现
if (!Function.prototype.apply2) {
    Function.prototype.apply2 = function () {
        // 绑定对象
        var obj = arguments[0] || (typeof window !== "undefined" ? window : global);
        // 绑定 this
        obj.fn = this;
        // 绑定参数解析处理
        var arr = arguments[1] || [];
        for (var args = [], i = 1; i <= arr.length; i++) {
            args.push("arguments[" + i + "]");
        }
        // 使用 eval 和 arguments 直传参数方式，得到结果
        var res = eval("obj.fn(" + args + ")");
        // 删除
        delete obj.fn;
        // 返回结果
        return res;
    };
}
var base = {
    pre: "欢迎："
};
function notify(name) {
    console.log(this.pre + name);
}
notify.apply2(base, ["张三"]); // 欢迎：张三
```

## 模拟 call

-   绑定对象查找，兼容处理全局变量
-   绑定对象关联方法， 切换 this 指向
-   eval 调用关联方法，拼接 arguments 参数传参
-   绑定对象解绑关联方法，还原绑定对象

```js
// call 方法实现
if (!Function.prototype.call2) {
    Function.prototype.call2 = function () {
        // 绑定对象
        var obj = arguments[0] || (typeof window !== "undefined" ? window : global);
        // 绑定 this
        obj.fn = this;
        // 绑定参数解析处理
        for (var args = [], i = 1; i < arguments.length; i++) {
            args.push("arguments[" + i + "]");
        }
        console.log(args);
        // 使用 eval 和 arguments 直传参数方式，得到结果
        var res = eval("obj.fn(" + args + ")");
        // 删除
        delete obj.fn;
        // 返回结果
        return res;
    };
}
var base = {
    pre: "欢迎："
};
function notify(...name) {
    console.log(this.pre + name.join());
}
notify.call2(base, "张三", "李四", "王五", "赵六"); // 欢迎：张三,李四,王五,赵六
```

## 模拟 instanceof

> 检测 constructor.prototype 是否存在于参数 object 的原型链上

```js
if (!Object.prototype.instanceof) {
    Object.prototype.instanceof = function (parent) {
        var proto = this;
        var count = 0;
        while (1) {
            count++;
            proto = proto.__proto__;
            if (proto === parent.prototype) {
                console.log("deep: %d", count);
                return true;
            }
            if (proto === Object.prototype) {
                console.log("deep: %d", count);
                return false;
            }
        }
    };
}
//用法如下
function C() {}
function D() {}
var o = new C();
console.log(o.instanceof(C)); // true
console.log(o.instanceof(D)); // false
```

## 模拟 Object.create

```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        // 忽略 propertiesObject
        if(
            Object.prototype.toString.call(proto) !== '[object Object]' ||
            typeof propertiesObject！=== 'undefined') {
            throw new Error("仅支持第一个参数为 object，第二个参数为 undefined")
        }
        function F() {}
        F.prototype = proto;
        return new F();
    };
}
```

## 模拟 Promise

参考资料

-   [Promises/A+ 标准](https://promisesaplus.com/)
-   [常见 Promise 面试题](https://juejin.cn/post/6850037281206566919#heading-5)
-   [Promise 的源码实现](https://juejin.cn/post/6844903796129136654#heading-0)
-   [手写自己的 Promise](https://zhuanlan.zhihu.com/p/341248347)

```js
/**
 * 术语
 * “promise” 是一个对象或函数，其 then 方法的行为符合本规范。
 * “thenable” 是定义 then 方法的对象或函数。
 * “value” 是任何合法的 JavaScript 值（包括undefined、thenable 或 promise）。
 * “异常” 是使用 throw 语句抛出的值。
 * “reason” 是一个值，表示承诺被拒绝的原因。
 */

const PENDING = "待定状态";
const RESOLVED = "已完成状态";
const REJECTED = "已拒绝状态";
const noop = (v) => v;
const noopErr = (e) => {
    throw e;
};
const isFn = (v) => typeof v === "function";
const isObj = (v) => typeof v === "object";

class Promise {
    constructor(callback) {
        this.value = undefined; // 任何合法的 JavaScript 值（包括undefined、thenable 或 promise）。
        this.reason = undefined; // 一个值，表示承诺被拒绝的原因。
        this.status = PENDING; // 当未决时，承诺：待定
        this.resolvedFnList = []; // 已完成状态的回调函数列表
        this.rejectedFnList = []; // 已拒绝状态的回调函数列表
        const resolve = (value) => {
            // 2.1.1.1 可以转换到已完成或拒绝状态。
            // 2.1.2.1 实现时，承诺：不得过渡到任何其他状态。
            if (this.status === PENDING) {
                this.status = RESOLVED;
                this.value = value;
                this.resolvedFnList.forEach((fn) => fn());
            }
        };
        const reject = (reason) => {
            // 2.1.1.1 可以转换到已完成或拒绝状态。
            // 2.1.3.1 当被拒绝时，一个承诺：不得过渡到任何其他状态。
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.rejectedFnList.forEach((fn) => fn());
            }
        };
        try {
            callback(resolve, reject); // 主函数立即执行
        } catch (error) {
            reject(error);
        }
    }
    /**
     * 承诺必须提供一种then方法来访问其当前或最终值或原因。
     * 一个 promise 的then方法接受两个参数：onResolve onRejected
     * 2.2.1 这两个 onResolved 和 onRejected 可选的参数：
     *      2.2.1.1 如果 onResolved 不是函数，则必须忽略它。
     *      2.2.1.2 如果 onRejected 不是函数，则必须忽略它。
     *
     * 始终返回一个 Promise 对象
     * onResolved 可选，可能是 Promise、fn 等，非函数忽略，使用 noop 函数 向下传递 value
     * onRejected 可选，可能是 Promise、fn 等，非函数忽略，使用 noopErr 函数向下传递 reason
     *      (先抛出 err，后续捕获 err，如果没有捕获到，最终抛出 err)
     * then 可以链式调用，可以多次调用
     * 当已拒绝状态时，没有找到处理拒绝状态的回调函数前都是已拒绝状态，找到后返回的新的 Promise 对象为已完成状态。
     */
    then(onResolved, onRejected) {
        // onResolved 可选，可能是 Promise、fn 等，非函数忽略，使用 noop 函数 向下传递 value
        onResolved = isFn(onResolved) ? onResolved : noop;
        // onRejected 可选，可能是 Promise、fn 等，非函数忽略，使用 noopErr 函数向下传递 reason
        onRejected = isFn(onRejected) ? onRejected : noopErr;
        // 承诺解决程序
        const resolvePromise = (promise2, x, resolve, reject) => {
            // 如果 promise 和 x 引用同一个对象，以 TypeError 为理由拒绝。
            if (promise2 === x) return reject(new TypeError("TypeError"));
            // 2.3.3.3.3 如果同时调用resolvePromise和rejectPromise，或者多次调用同一个参数，则第一个调用优先，任何进一步的调用都将被忽略。
            let called = false;
            // 2.3.3 如果 x 是一个非 null 的对象或函数
            if ((isObj(x) && x !== null) || isFn(x)) {
                try {
                    // 3.5
                    // 这个首先存储对 的引用x.then，然后测试该引用，然后调用该引用的过程避免了对该x.then属性的多次访问。
                    // 这些预防措施对于确保访问器属性的一致性很重要，访问器属性的值可能会在检索之间发生变化。
                    let then = x.then;
                    if (isFn(then)) {
                        then.call(
                            x,
                            (y) => {
                                if (called) return;
                                called = true;
                                // 递归（ 可能promise 嵌套）
                                resolvePromise(promise2, y, resolve, reject);
                            },
                            (z) => {
                                if (called) return; // 只要失败就失败
                                called = true;
                                reject(z);
                            }
                        );
                    } else {
                        // 2.3.3.4 如果 then 不是一个函数，用 x 完成 promise。
                        resolve(x);
                    }
                } catch (e) {
                    // 2.3.3.2 抛出的异常的结果 e，e 作为拒绝 promise 的原因。
                    if (called) return;
                    called = true;
                    reject(e);
                }
            } else {
                resolve(x);
            }
        };
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onResolved(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.resolvedFnList.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onResolved(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.rejectedFnList.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        // 2.2.7 then必须返回一个承诺
        return promise2;
    }
    /**
     * resolve 静态方法，返回一个已完成 Promise 对象
     * resolve 可以没有接收函数，不报错
     */
    static resolve(v) {
        return v instanceof Promise ? v : new Promise((res, rej) => res(v));
    }
    /**
     * reject 静态方法，返回一个已拒绝 Promise 对象
     * reject 返回的一个已拒绝 Promise 对象，必须要找到处理方法（catch() 或者 then.onRejected()），否则报错
     */
    static reject(v) {
        return v instanceof Promise ? v : new Promise((res, rej) => rej(v));
    }
    /**
     * all 方法是一个静态方法
     * all 方法返回一个Promise对象
     * all 方法传入的是一个带有 Promise 对象的数组
     * 只有数组中的 Promise 对象都成功执行，才能回调成功方法
     * 如果有 Promise 对象失败，则调用失败方法
     */
    static all(arr) {
        return new Promise((resolve, reject) => {
            const resultArr = [];
            let count = 0;
            function insertArr(idx, val) {
                resultArr[idx] = val;
                count++;
                if (count === arr.length) resolve(resultArr);
            }
            arr.forEach((obj, idx) => {
                if (obj instanceof Promise) {
                    obj.then(
                        (val) => insertArr(idx, val),
                        (err) => reject(err)
                    );
                } else {
                    insertArr(idx, val);
                }
            });
        });
    }
    /**
     * race 方法传入 Promise 对象数组。
     * race 只返回执行最快的一个 Promise 结果，不论成功与失败。
     * 返回结果与最快的 Promise 的成功与失败保持一致。
     * 如果数组不包含 Promise 对象，返回数组第一项
     */
    static race(arr) {
        return new Promise((resolve, reject) => {
            let hasPromise = false;
            arr.forEach((obj, idx) => {
                if (obj instanceof Promise) {
                    hasPromise = true;
                    obj.then(resolve, reject);
                }
                if (idx === arr.length - 1 && !hasPromise) {
                    resolve(arr[0]);
                }
            });
        });
    }
    /**
     * 不管成功还是失败，都会走到 finally 中,
     * 并且 finally 之后，还可以继续 then。并且会将值原封不动的传递给后面的 then.
     */
    finally(callback) {
        return this.then(
            (value) => {
                return Promise.resolve(callback()).then(() => {
                    return value;
                });
            },
            (reason) => {
                return Promise.resolve(callback()).then(() => {
                    throw reason;
                });
            }
        );
    }
    /**
     * catch 是一个 then 的已拒绝状态。
     * catch 不能想 then 一样自动接受 Promise 对象的状态
     * catch 接受异常错误和未处理过的拒绝状态的返回数据
     */
    catch(onCatchFn) {
        this.then(undefined, onCatchFn);
    }
}
// Promise/A+规范提供了一个专门的测试脚本，可以测试所编写的代码是否符合Promise/A+的规范。
// 首先，在 promise2 实现的代码中，增加以下代码:
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;

/**
 * 测试方法 (测试范围不包括 Promise 方法)
 * > npm i -g promises-aplus-tests
 * > promises-aplus-tests demo.js
 *
 * 测试结果：872 passing (17s)
 */
```

## 模拟 Sleep

```js
async function Sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
// 使用 await 调用，将后续代码执行挂起等待。
```

## 模拟 isArray

```js
if (!Array.isArray) {
    Array.isArray = (arg) => Object.prototype.toString.call(arg) === "[object Array]";
}
```
