// 参照 @vue/reactivity, 涉及 ref、reactive、effect 三个模块实现

class Dep {
    constructor() {
        this.effects = new Map(); // [{ [Object]: new Set() }]
    }
    depend(obj, effect) {
        let list = this.effects.get(obj) || new Set();
        list.add(effect);
        this.effects.set(obj, list);
    }
    notice(obj) {
        const list = this.effects.get(obj);
        list && list.forEach((effect) => effect());
    }
}

const dep = new Dep();

const effectStack = [];

const effect = function (fn) {
    const effectFn = function () {
        if (!effectStack.includes()) {
            effectStack.push(effectFn);
        }
        let res = fn();
        effectStack.pop();
        return res;
    };
    effectFn();
    return effectFn;
};

const ref = function (value) {
    const obj = { value };
    const handler = {
        get() {
            const value = Reflect.get(...arguments);
            const effect = effectStack[effectStack.length - 1];
            effect && dep.depend(obj, effect);
            return value;
        },
        set() {
            const res = Reflect.set(...arguments);
            dep.notice(obj);
            return res;
        },
    };
    return new Proxy(obj, handler);
};

const reactive = function (obj) {
    const handler = {
        get() {
            const val = Reflect.get(...arguments);
            const effect = effectStack[effectStack.length - 1];
            effect && dep.depend(obj, effect);
            // 嵌套对象递归代理
            return typeof val === "object" ? new Proxy(val, handler) : val;
        },
        set() {
            const res = Reflect.set(...arguments);
            dep.notice(obj);
            return res;
        },
    };
    return new Proxy(obj, handler);
};

// =============================
// ========= 测试用例 ===========
// =============================

let a = ref(0);
let obj = reactive({
    b: { b1: 1, b2: 2 },
});
let c, d;
effect(() => {
    c = a.value + 1;
    console.log(c);
});
effect(() => {
    d = obj.b.b2 + 1;
    console.log(d);
});
a.value++;
obj.b.b2++;
// 日志: 1
// 日志: 3
// 日志: 2
// 日志: 4
