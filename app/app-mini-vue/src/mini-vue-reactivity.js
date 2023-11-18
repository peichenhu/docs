// ==========================================
// ===> 发布订阅
// ==========================================

let activeEffect;
class Ref {
    constructor(value) {
        this._value = value;
        this.effectList = new Set();
    }
    get value() {
        this.depend();
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.notify();
    }
    depend() {
        if (activeEffect) {
            this.effectList.add(activeEffect);
        }
    }
    notify() {
        // debugger;
        this.effectList.forEach((effect) => {
            effect();
        });
    }
}

class Dep {
    constructor() {
        this.effectList = new Set();
    }
    depend() {
        if (activeEffect) {
            this.effectList.add(activeEffect);
        }
    }
    notify() {
        // debugger;
        this.effectList.forEach((effect) => {
            effect();
        });
    }
}

// ==========================================
// ===> ref
// ==========================================

const ref = (value) => new Ref(value);

// ==========================================
// ===> reactive
// ==========================================

const targetMap = new WeakMap();

const getDep = function (target, key) {
    let depMap = targetMap.get(target);
    if (!depMap) {
        depMap = new Map();
        targetMap.set(target, depMap);
    }
    let dep = depMap.get(key);
    if (!dep) {
        dep = new Dep();
        depMap.set(key, dep);
    }
    return dep;
};

const reactive = function (obj) {
    let handler = {
        get(target, key) {
            const dep = getDep(target, key);
            const value = Reflect.get(...arguments);
            dep.depend();
            return typeof value === "object"
                ? new Proxy(value, handler)
                : value;
        },
        set(target, key, value) {
            const dep = getDep(target, key);
            const res = Reflect.set(...arguments);
            dep.notify();
            return res;
        },
    };
    return new Proxy(obj, handler);
};

// ==========================================
// ===> watchEffect
// ==========================================

const watchEffect = function (effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
};

export default {
    ref,
    reactive,
    watchEffect,
};
