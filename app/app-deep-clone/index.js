// ==========================================
// ===> 前置依赖
// ==========================================
const wp = new WeakMap();
const env = typeof self === "object" ? self : globalThis;
const is = (d, t) => Reflect.toString.call(d) === `[object ${t}]`;
const beforeRecursion = (data, _data) => wp.set(data, _data);

// ==========================================
// ===> deepClone
// ==========================================
function deepClone(data) {
    if (wp.has(data)) return wp.get(data);
    if (is(data, "Object")) return cloneObject(data, beforeRecursion);
    if (is(data, "Array")) return cloneArray(data, beforeRecursion);
    if (is(data, "Map")) return cloneMap(data, beforeRecursion);
    if (is(data, "Set")) return cloneSet(data, beforeRecursion);
    if (is(data, "Symbol")) return cloneSymbol(data, beforeRecursion);
    if (is(data, "Date")) return cloneDate(data, beforeRecursion);
    if (is(data, "RegExp")) return cloneRegExp(data, beforeRecursion);
    if (is(data, "Error")) return cloneError(data, beforeRecursion);
    return data;
}

// ==========================================
// ===> cloneArray
// ==========================================
function cloneArray(data = [], beforeRecursion) {
    const _data = new Array();
    beforeRecursion(data, _data); // 递归前操作
    for (const i of data) {
        _data.push(deepClone(i));
    }
    return _data;
}

// ==========================================
// ===> cloneObject
// ==========================================
function cloneObject(data = {}, beforeRecursion) {
    const _data = new Object(data.prototype);
    // _data.prototype = Object.getPrototypeOf(data); // 处理原型
    beforeRecursion(data, _data); // 递归前操作
    // 处理可枚举的自身非继承属性
    // for (const key in data) {
    //     if (Object.hasOwnProperty.call(data, key)) {
    //         _data[key] = deepClone(data[key]);
    //     }
    // }

    // 处理可枚举的自身非继承属性
    for (const key of Object.keys(data)) {
        _data[key] = deepClone(data[key]);
    }
    // 处理不可枚举的 Symbol 属性
    for (const key of Object.getOwnPropertySymbols(data)) {
        _data[key] = deepClone(data[key]);
    }
    return _data;
}

// ==========================================
// ===> cloneMap
// ==========================================
function cloneMap(data, beforeRecursion) {
    const _data = new Map();
    beforeRecursion(data, _data); // 递归前操作
    for (const [key, index] of data) {
        _data.set(deepClone(key), deepClone(index));
    }
    return _data;
}

// ==========================================
// ===> cloneSet
// ==========================================
function cloneSet(data, beforeRecursion) {
    const _data = new Set();
    beforeRecursion(data, _data); // 递归前操作
    for (const index of data) {
        _data.add(deepClone(index));
    }
    return _data;
}

// ==========================================
// ===> cloneDate
// ==========================================
function cloneDate(data) {
    return new Date(data);
}

// ==========================================
// ===> cloneRegExp
// ==========================================
function cloneRegExp(data) {
    const { source, flags } = data;
    const r = new RegExp(source, flags);
    r.lastIndex = data.lastIndex;
    return r;
}

// ==========================================
// ===> cloneError
// ==========================================
function cloneError(data) {
    const { name, message } = data;
    const err = new globalThis[name](message);
    return err;
}
// ==========================================
// ===> cloneError
// ==========================================
function cloneSymbol(data) {
    return new Symbol(data.description);
}
// ==========================================
// ===> 测试
// ==========================================
const loopArr = [];
const loopObj = {};
const obj = {
    arr: [1, 2, 3],
    boolean: true,
    number: 123,
    string: "",
    undefined: undefined,
    null: null,
    symbol: Symbol(),
    loopArr,
    loopObj,
    object: {
        test: "obejct",
    },
    fn: (a) => a,
    [Symbol("a")]: "Symbol(a)",
    map: new Map(),
    set: new Set(),
};

obj.prototype = Array.prototype;
obj.loopArr.push(obj);
obj.loopObj["circular"] = obj;
obj.map.set(obj.object, obj.object);
obj.set.add(obj.object);

const _obj = deepClone(obj);
console.log("新对象", _obj);
console.log("新旧对象一致性", _obj === obj);
console.log("新旧对象原型一致性", obj.prototype === _obj.prototype);
console.log("新旧对象循环引用一致性", obj.loopArr[0] === _obj.loopArr[0]);
