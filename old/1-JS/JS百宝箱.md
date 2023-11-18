# JS-百宝箱

> 事必躬亲，牢记于心

## ??和?.

-   ??

只有当左侧为 null 和 undefined 时，才会返回右侧的数

```js
console.log(0 ?? "备胎"); // 0
console.log(1 ?? "备胎"); // 1
console.log("" ?? "备胎"); // ""
console.log(null ?? "备胎"); // 备胎
console.log(undefined ?? "备胎"); // 备胎
console.log(false ?? "备胎"); // false
```

-   ?.

可选链操作符, 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。

> 语法：obj?.prop obj?.[expr] arr?.[index] func?.(args)

```js
var obj = { a: 1, c: { d: 1 } };
console.log(obj?.a); // 1
console.log(obj?.b); // undefined
console.log(obj?.b ?? "备胎"); // 备胎
console.log(obj.a?.b); // undefined
console.log(obj.c?.d); // 1
console.log(obj.x?.y.z); // undefined
console.log(obj.fn?.()); // undefined 如果希望允许 obj 也为 null 或者 undefined ，那么你需要像这样写 obj?.customMethod?.()

// 可选链与表达式：
let nestedProp = obj?.["prop" + "Name"];

// 可选链访问数组：
let arrayItem = arr?.[42];

let myMap = new Map();
myMap.set("foo", { name: "baz", desc: "inga" });
let nameBar = myMap.get("bar")?.name;
// 在一个不含 bar 成员的 Map 中查找 bar 成员的 name 属性，因此结果是 undefined。

// 短路计算：
let potentiallyNullObj = null;
let x = 0;
let prop = potentiallyNullObj?.[x++];
console.log(x); // x 将不会被递增，依旧输出 0
// 当在表达式中使用可选链时，如果左操作数是 null 或 undefined，表达式将不会被计算
```

## 对象定义

```js
var obj = new Object();
var obj = {};
Object.defineProperty(obj, "attr", {
    configurable: true, // 默认 true；表示能否使用 delete 删除属性从而重新定义属性。
    enumerable: true, // 默认 true；表示能否通过 for-in 循环返回属性。
    writable: true, // 默认 true；表示能否修改属性值。
    value: undefined, // 默认 undefined；表示属性的值。
    set: undefined, // 默认 undefined；表示写入属性时调用函数。
    get: undefined // 默认 undefined；表示读取属性时调用函数。
});
```

## 防抖

> 大流量，尾输出，双层函数，参数传递，延时控制，延时拦截

```js
/**
 * 防抖: 大流量拦截只输出一次
 * @param {function} fn 执行函数
 * @param {number} delay 延时时间
 * @returns 包装函数
 */
export function throttle(fn, delay = 500) {
    // 语法检查
    if (!fn || !(fn instanceof Function)) return fn;
    // 初始状态：非占用状态
    let isPending = false;
    // 初始化计时器
    let timer = null;
    // 包装函数
    function res() {
        // 防抖函数拦截流量次数：
        console.count("防抖函数拦截流量次数：");
        // 占用状态，重新计时
        isPending && clearTimeout(timer);
        // 开启占用状态
        isPending = true;
        // 执行间隔时间控制
        timer = setTimeout(() => {
            // 执行函数并传递参数,这里 apply 和 this ，只是为了传递 arguments
            fn.apply(this, arguments);
            // 关闭占用状态
            isPending = false;
            // 防抖函数输出流量次数：
            console.count("防抖函数输出流量次数： ");
        }, delay);
    }
    // 返回值
    return res;
}

// 手写专供简版-防抖
function thorttle(fn, delay = 500) {
    let t = null;
    return (...arg) => {
        clearTimeout(t);
        t = setTimeout(() => {
            fn(...arg);
        }, delay);
    };
}
```

## 节流

> 大流量，间隔输出，双层函数，参数传递，状态拦截，延时控制

```js
/**
 * 节流函数：对重复的大流量输入有节制的输出
 * @param {function} fn 执行函数
 * @param {number} delay 间隔时间
 * @returns 包装函数
 */
export function debounce(fn, delay = 500) {
    // 语法检查
    if (!fn || !(fn instanceof Function)) return fn;
    // 状态：非占用状态
    let isPending = false;
    // 拦截次数
    let allCount = 0;
    // 执行次数
    let doCount = 0;
    // 包装函数
    function res() {
        allCount++;
        // 占用状态，执行拦截
        if (isPending) return false;
        // 开启占用状态
        isPending = true;
        // 执行间隔时间控制
        setTimeout(() => {
            doCount++;
            // 执行函数并传递参数
            fn.apply(this, arguments);
            // 关闭占用状态
            isPending = false;
            console.log("节流函数拦截次数：%s；执行次数：%s", allCount, doCount);
        }, delay);
    }
    // 返回值
    return res;
}

// 手写专供简版-节流
function debounce(fn, delay = 500) {
    let pending = false;
    return (...arg) => {
        if (pending) return;
        pending = true;
        t = setTimeout(() => {
            fn(...arg);
            pending = false;
        }, delay);
    };
}
```

## 计数定时器

> 闭包 块作用域

```js
/**
 * 计数定时器
 * @param {function} fn 执行函数
 * @param {number} count 执行次数
 * @param {number} delay 延时时间
 * @param {string} mode 语法模型
 */
export function timerdown(fn, count = 10, delay = 500) {
    // 语法检查
    if (!fn || !(fn instanceof Function)) return fn;
    // 输出次数控制器
    for (var i = 0; i < count; i++) {
        // IIFE 变量持久化
        (function (i) {
            // 累积式延时输出
            setTimeout(() => {
                // 执行函数
                fn();
            }, i * delay);
        })(i);
    }
}

// 手写专供简版-节流
const timerdown = (fn, count = 10, delay = 500) => {
    for (let i = 0; i < 10; i++) {
        setTimeout(fn, i * delay);
    }
};
```

## 地址栏取参数

```js
/**
 * 地址栏取参数
 * @param {string} key 属性名
 * @param {string} link 自定义链接
 * @returns 属性值 || 参数对象
 */
export function getQuery(key = null, link) {
    // 取出目标值
    link = (link || "").split("?")[1] || "";
    // 初始化返回值
    const query = {};
    // 取出有效值
    const search = link.split("#")[0] || "";
    // 解码处理
    decodeURIComponent(search)
        .split("&")
        .forEach((str) => {
            if (!str) return;
            const [key, val] = str.split("=");
            // 切记 val 只能是 string
            query[key] = val;
        });
    // 分情况返回
    return key ? query[key] || "" : query;
}
```

## 地址栏参数拼接

```js
/**
 * 地址栏参数拼接
 * @param {string} link 跳转链接
 * @param {object} query 新参数对象
 * @param {boolean} isQueryOverWriteLink 是否使用 query 重写 link.query
 * @returns 新链接
 */
export function setQuery(link, query, isQueryOverWriteLink = false) {
    // 兼容处理
    link = link || "";
    // 新旧参数合并
    if (isQueryOverWriteLink) {
        query = Object.assign({}, getQuery(null, link), query);
    } else {
        query = Object.assign({}, query, getQuery(null, link));
    }
    // 路径
    const pathname = link.split("?")[0];
    // 哈希
    const hash = link.indexOf("#") !== -1 ? "#" + encodeURIComponent(link.split("#")[1]) : "";
    // 参数
    let search = "";
    // 拼接参数
    for (const key in query) {
        search += `${!search ? "?" : "&"}${key}=${encodeURIComponent(query[key])}`;
    }
    // 返回值
    return pathname + search + hash;
}
```

## 非空值检查

```js
/**
 * 非空值检查
 * @param {any} val 目标值
 * @returns 布尔值
 */
export function notEmpty(val) {
    const type = Object.prototype.toString.call(val);
    if (type === "[object Array]") return !!val.length;
    if (type === "[object Object]") return !!Object.keys(val).length;
    if (type === "[object Map]") return !!val.size;
    if (type === "[object Set]") return !!val.size;
    return val !== null && val !== "" && val !== undefined;
}
```

## 对象继承扩展

```js
/**
 * 对象继承
 * 扩展对象原型方法
 */
export function objectExtend() {
    Object.prototype.extend = function (obj) {
        Object.assign(this, obj);
    };
}
```

## DOM 添加内联样式表

```js
/**
 * DOM 添加内联样式表
 * @param {string} styleSheet 字符串
 * @param {string} codeAttr 样式表标识符
 */
export function addStyleSheet(styleSheet, codeAttr) {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("code", codeAttr);
    style.appendChild(document.createTextNode(styleSheet));
    document.getElementsByTagName("head")[0].appendChild(style);
}
```

## 删除对象里的某些属性

```js
/**
 * 删除对象里的某些属性
 * @param {object} obj 一个对象
 * @param {array} attrList 对象里可能存在的属性数组
 * @returns 变更后的对象
 */
export function delObjectAttr(obj, attrList = []) {
    for (const key in obj) {
        if (attrList.includes(key)) {
            delete obj[key];
        }
    }
    return obj;
}
```

## 链式函数

> fn(2)(3)(4) = 24

```js
/**
 * 使用 toString 或者 toString
 */
var obj = {
    toString: () => "toString",
    valueOf: () => "valueOf"
};
console.log("对象调用了:" + obj); // "调用了:valueOf"

function fn() {
    fn.toString = () => "toString";
    fn.valueOf = () => "valueOf";
    return fn;
}
console.log("对象调用了:" + fn()); // "调用了:valueOf"

function china(x) {
    const fn = (y) => china(x * y); // 返回一个函数，函数参数里面做乘法运算
    fn.toString = () => x; // 重写 toString 在链式运算最后一步输出结果
    fn.valueOf = () => x; // 重写 valueOf 在链式运算最后一步输出结果
    return fn;
}
console.log(china(1)(2)(3)(4)); // 24
```

## REM 响应式处理方案

```js
((win, doc) => {
    // 默认字体大小 设计高宽度 动态计算字体大小
    let [defalutFontSize, uiWidth, size] = [100, 750, null];
    let htmlFontSize = () => {
        // 获取屏幕宽高
        let { clientWidth, clientHeight } = doc.documentElement;
        // 计算字体大小
        size = Math.round((clientWidth / uiWidth) * 100);
        // 字体最大限制
        size = size > 100 ? defalutFontSize : size;
        // 设置 html 根元素 字体大小
        doc.documentElement.style.fontSize = size + "px";
        // 设置 body 高度，内滚动，[可选]
        doc.body.style.height = clientHeight + "px";
    };
    // 窗口大小改变监听，实时计算html 根元素 字体大小
    win.addEventListener("resize", htmlFontSize, false);
    // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
    doc.addEventListener("DOMContentLoaded", htmlFontSize, false);
})(window, document);
```

## 随机整数

```js
export const getNumber = (min = 0, max = 99) => {
    if (min === 0) return Math.round(Math.random() * max);
    return Math.round(Math.random() * (max - min)) + min;
};
```

## 多功能日期函数

```js
export const fmtDate = (fmt = "Y-M-D hh:mm:ss", dateTime, offset = 0) => {
    let offsetDay = 1000 * 60 * 60 * 24 * offset;
    let time = dateTime ? +new Date(dateTime) : +new Date(),
        now = new Date(time + offsetDay),
        Y = now.getFullYear(),
        M = now.getMonth() + 1,
        D = now.getDate(),
        hh = now.getHours(),
        mm = now.getMinutes(),
        ss = now.getSeconds();

    M = M >= 10 ? M : "0" + M;
    D = D >= 10 ? D : "0" + D;
    hh = hh >= 10 ? hh : "0" + hh;
    mm = mm >= 10 ? mm : "0" + mm;
    ss = ss >= 10 ? ss : "0" + ss;

    fmt = fmt.replace(/Y/, Y);
    fmt = fmt.replace(/M/, M);
    fmt = fmt.replace(/D/, D);
    fmt = fmt.replace(/hh/, hh);
    fmt = fmt.replace(/mm/, mm);
    fmt = fmt.replace(/ss/, ss);
    return fmt;
};
```

## 浏览器全屏

```js
export const fullScreen = () => {
    let doc = document;
    let el = document.documentElement;
    // 全屏状态 退出全屏
    if (doc.webkitIsFullScreen || doc.mozFullScreen || doc.msFullscreenElement || doc.fullscreen) {
        if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
        else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
        else if (doc.msFullscreenElement) doc.msFullscreenElement();
        else if (doc.exitFullscreen) doc.exitFullscreen();
    } else {
        if (el.webkitRequestFullScreen) el.webkitRequestFullScreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
        else if (el.requestFullScreen) el.requestFullScreen();
    }

    return;
};
```

## 近 24 小时

```js
export const array24h = () => {
    let time1h = 60 * 60 * 1000;
    let now = new Date();
    let pre_hh = new Date(+now - time1h).getHours();
    let arr24 = [];
    for (let i = 0; i < 24; i++) {
        let hh = pre_hh - i;
        hh = hh < 0 ? 24 + hh : hh;
        hh = hh < 10 ? "0" + hh : hh;
        arr24.unshift(hh + ":00:00");
    }
    return arr24;
};

// 近12个月
export const arrayMonth = (startDate) => {
    let now = startDate ? new Date(startDate) : new Date(),
        day1 = 24 * 60 * 60 * 1000,
        arr30 = [];
    for (let i = 0; i < 30; i++) {
        let pre = new Date(+now - day1 * i),
            Y = pre.getFullYear(),
            M = pre.getMonth() + 1,
            D = pre.getDate();
        M = M >= 10 ? M : "0" + M;
        D = D >= 10 ? D : "0" + D;
        arr30.unshift(`${Y}-${M}-${D}`);
    }
    return arr30;
};
```

## 数字补零

```js
export const fmtNumber = (num, max = 100000000) => {
    if (isNaN(num - 0)) num = 0;
    if (num >= max) return "99999999+";

    let str0 = "0000000000000000000000";
    let pre = [];
    let len = max.toString().length;

    for (let i = 0; i < len; i++) pre.push(str0.slice(0, i));
    return pre[len - String(num).length] + num;
};
```

## echart 暂无数据

```js
export default {
    title: {
        text: "暂无数据",
        show: true,
        textStyle: {
            color: "grey",
            fontSize: 20
        },
        left: "center",
        top: "center"
    }
};
```

## 水波纹按钮

<WaterButton />

```vue
<template>
    <div class="my-module">
        <span class="btnWater btn">水波纹按钮1</span>
        <span class="btnWater btn">水波纹按钮2</span>
        <span class="btn">普通按钮3</span>
    </div>
</template>

<script>
export default {
    props: {},
    mounted() {
        var className = "btnWater";
        document.addEventListener("mouseup", function (e) {
            console.log("WaterButton");
            // 消除默认事件
            e.preventDefault();
            // 指定样式类，自动注册事件
            let loop = (el) => {
                if (el.className && el.className.split(" ").indexOf(className) !== -1) return el;
                else if (el.parentNode) return loop(el.parentNode);
                else return null;
            };
            // 查找绑定元素
            let btnWater = loop(e.target);
            // 动态DOM,生成效果
            if (btnWater) {
                const _offset = btnWater.getBoundingClientRect();
                const [left, top] = [e.clientX - _offset.left, e.clientY - _offset.top];
                const el = document.createElement("i");
                el.setAttribute(
                    "style",
                    `
                        top:${top}px;
                        left:${left}px;
                        pointer-events: none;
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        border-radius: 50%;
                        animation: water 1000ms linear;
                    `
                );
                btnWater.appendChild(el);
                const removeChildren = () => btnWater.childNodes[1] && btnWater.removeChild(btnWater.childNodes[1]);
                setTimeout(removeChildren, 1200);
            }
        });
    }
};
</script>
<style>
.btn {
    display: inline-block;
    padding: 10px 50px;
    color: white;
    background: blue;
    margin: 1em;
    text-align: center;
    line-height: 50px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

@keyframes water {
    from {
        transform: scale(0);
        background: rgba(255, 255, 255, 0.4);
    }
    to {
        transform: scale(50);
        background: rgba(255, 255, 255, 0);
    }
}
</style>
```

## 点击空白关闭弹窗

```js
$(document).mouseup(function (e) {
    var _con = $(" 目标区域 "); // 设置目标区域
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        // Mark 1
        // some code...
        // 功能代码
    }
});
/* Mark 1 的原理：
判断点击事件发生在区域外的条件是：
1. 点击事件的对象不是目标区域本身
2. 事件对象同时也不是目标区域的子元素
*/
```

## Base64 to String

```js
function decodeBase64(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
```

## JS HTML 实体化

```js
var encodeHTML = function (content) {
    if (Object.prototype.toString.call(content) !== "[object String]") return content;
    content = content.replace(/&/g, "&amp;");
    content = content.replace(/</g, "&lt;");
    content = content.replace(/>/g, "&gt;");
    content = content.replace(/"/g, "&quot;");
    content = content.replace(/'/g, "&#039;");
    return content;
};
```

## 组合继承

-   组合继承指的是将原型链和借用构造函数的技术组合到一块的继承方式。
-   缺点：超类被调用了两次，子类失去了默认的原型构造函数

```js
// 超类
function SuperType(name) {
    this.name = "a";
    this.attr = [1, 2, 3];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
// 子类
function SubType(name, some) {
    this.some = "b";
    SuperType.call(this, name);
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.saySome(){
    console.log(this.some);
}
```

## 寄生组合继承

-   缺点还是太繁琐

```js
// 调用寄生组合继承
function jsExtend(Sup, Sub) {
    var proto = Object(Sup.prototype)
    proto.constructor = Sub
    Sub.prototype = proto;
}
// 超类
function SuperType(name) {
    this.name = "a";
    this.attr = [1, 2, 3];
}
// 添加超类方法
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
// 子类
function SubType(name, some) {
    this.some = "b";
    SuperType.call(this, name);
}
// 调用寄生组合继承
jsExtend(SuperType, SubType)
// 继承完，添加子类方法
SubType.prototype.saySome(){
    console.log(this.some);
}
```

## 响应式数据 defineProperty

## 响应式数据 Poxy

## 大数运算

## 函数管道 pipe(compose)

> pipe(fn1, fn2, fn3, fn4)(1)

```js
const fn1 = (x) => x + 1;
const fn2 = (x) => x + 2;
const fn3 = (x) => x + 3;
const fn4 = (x) => x + 4;

console.log(pipe(fn1, fn2, fn3, fn4)(1)); // 1+4+3+2+1=11
console.log(pipe2(fn1, fn2, fn3, fn4)(1)); // 1+4+3+2+1=11
console.log(compose(fn1, fn2, fn3, fn4)(1)); // 1+4+3+2+1=11

// 内循环
function pipe(...arg) {
    let i = 0;
    return (n) => {
        while (i < arg.length) {
            n = arg[i](n);
            i++;
        }
        return n;
    };
}

// 内循环2
function pipe2(...arg) {
    let i = 0;
    return (n) => {
        while (1) {
            if (!arg[i]) return;
            n = arg[i++](n);
        }
        return n;
    };
}

// reduce 循环
// 原作者：https://juejin.cn/post/6968713283884974088#heading-36
function compose(...fn) {
    if (!fn.length) return (v) => v;
    if (fn.length === 1) return fn[0];
    return fn.reduce(
        (pre, cur) =>
            (...args) =>
                pre(cur(...args))
    );
}

// 原生链式 Promise.then
function pipe3(...args) {
    return (v) => {
        var p = Promise.resolve(v);
        args.forEach((fn) => p.then(fn));
        return p;
    };
}

// await
function pipe4(...args) {
    return (v) => {
        args.forEach(async (fn) => {
            v = await fn(X);
        });
        return v;
    };
}
// 本次测试方案数量：3
// pipe x 24,735,331 ops/sec ±0.52% (87 runs sampled)
// pipe2 x 20,848,832 ops/sec ±0.47% (87 runs sampled)
// compose x 9,464,699 ops/sec ±0.64% (86 runs sampled)
// 最快的算法是：pipe
```

## cookie 操作

```js
//设置cookie (不传过期时间,默认回话级别)
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
}
// 获取 cookie
function getCookie(name) {
    const obj = {};
    var cookies = document.cookie;
    var arr = cookies.split(";");
    arr.forEach((item) => {
        const key = item.split("=")[0].trim();
        const value = item.split("=")[1];
        obj[key] = value;
    });
    return obj[name];
}
```

## Promise 解决回调地狱

```js
// 回调地狱
$.get(url, data, (data1) => {
    console.log(data1);
    $.get(url, data1, (data2) => {
        console.log(data2);
        $.get(url, data2, (data3) => {
            console.log(data3);
        });
    });
});

// 包装函数
function _get(url, data) {
    return new Promise((res, rej) => {
        $.get(url, data, (data1) => {
            res(data1);
        });
    });
}

// then 接收 undefined、Error、值、Promise 对象
_get(url, data)
    .then((data) => {
        return _get(url, data);
    })
    .then((data) => {
        return _get(url, data);
    })
    .then((data) => {
        return _get(url, data);
    });

var res = async (url, data) => {
    data = await _get(url, data);
    data = await _get(url, data);
    data = await _get(url, data);
    return data;
};
```
