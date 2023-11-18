---
sidebarDepth: 2
---

# JS-手写设计模式

> 事必躬亲，牢记于心

## 发布订阅模式

> Publish/Subscribe

```js
class EventEmitter {
    constructor() {
        this.events = {
            // name1: [ callback1, callback2 ]
        };
    }
    on(name, callback) {
        if (this.events[name]) {
            this.events[name].push(callback);
        } else {
            this.events[name] = [callback];
        }
    }
    once(name, callback) {
        const _this = this;
        function fn(...args) {
            callback(...args);
            _this.off(name, fn);
        }
        this.on(name, fn);
    }
    off(name, callback) {
        if (this.events[name]) {
            this.events[name] = this.events[name].filter((fn) => fn !== callback);
        }
    }
    emit(name, ...args) {
        if (this.events[name]) {
            this.events[name].forEach((fn) => fn(...args));
        }
    }
}

// 如何使用
const parent = new EventEmitter();
parent.once("username", (...args) => console.log("欢迎使用 EventEmitter, 发现参数：", ...args));
parent.on("username", () => console.log("发现事件：username"));
parent.on("username", (...args) => console.log("发现事件：username，发现参数：", ...args));
parent.emit("username", "张三", "李四");
parent.emit("username", "王三", "赵四");
```

## 单例模式

```js
// 通用单例模式js
const Singleton = function (fn) {
    // 立即执行，创建闭包，保护 instance 实例变量
    let instance = null;
    return function () {
        // 确保初始化一次单身狗实例
        if (!instance) {
            // 初始化单身狗实例
            instance = fn.apply(this, arguments);
        }
        // 返回实例（唯一）
        return instance;
    };
};
```
