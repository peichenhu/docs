# JS-面向对象

## 面向对象三大特性：

1. `封装`: 隐藏对象的属性和实现细节，仅对外提供公共访问方式，将变化隔离，便于使用，提高复用性和安全性。
2. `继承`: 提高代码复用性；继承是多态的前提。
3. `多态`: 父类或接口定义的引用变量可以指向子类或具体实现类的实例对象。提高了程序的拓展性。

## 面向对象五大原则

1. `单一职责原则` SRP: Single Responsibility Principle

类的功能要单一，不能包罗万象，跟杂货铺似的。

2. `开放封闭原则` OCP: Open－Close Principle

一个模块对于拓展是开放的，对于修改是封闭的，想要增加功能热烈欢迎，想要修改，哼，一万个不乐意。

3. `里式替换原则` LSP: the Liskov Substitution Principle

子类可以替换父类出现在父类能够出现的任何地方。比如你能代表你爸去你姥姥家干活。哈哈~~

4. `依赖倒置原则` DIP: the Dependency Inversion Principle

高层次的模块不应该依赖于低层次的模块，他们都应该依赖于抽象。抽象不应该依赖于具体实现，具体实现应该依赖于抽象。就是你出国要说你是中国人，而不能说你是哪个村子的。比如说中国人是抽象的，下面有具体的 xx 省，xx 市，xx 县。你要依赖的是抽象的中国人，而不是你是 xx 村的。

5. `接口分离原则` ISP:the Interface Segregation Principle

设计时采用多个与特定客户类有关的接口比采用一个通用的接口要好。就比如一个手机拥有打电话，看视频，玩游戏等功能，把这几个功能拆分成不同的接口，比在一个接口里要好的多。

## 个人理解 (JS OOP)

### this

**this 永远指向调用时距离最近的上下文对象**，要么是 `window` 要么是 `一个具体对象`;

（❓ 所以构造函数会导致实例化继承属性和方法，或者说模仿、仿造，克隆，你有一个名字，我也要有一个名字。 😳 不知道这样理解对不对 😳 ）

### prototype

`原 型 对 象`: **每一个函数都有原型对象**

`__proto__`: 除了 `Object.create(null)`, 其他的对象都有 `原型指针 [[prototype]]`

### 父类

含有属性、方法、可选的构造函数，构造函数（或者其他方式）能创建子类。

### 子类

能够创建出实例对象，含有自己的属性、方法、构造函数，含有从父类继承来的属性、方法。

### 实例化

在面向对象的编程中，通常把`用类创建对象的过程`称为`实例化`。

### 三大特性

表达的意思是任何包装父类，来满足父类和子类之间某种特定的关系。重点在于父类。

### 封装

把父类包装起来，分成`共有（父子都能用的）`、`私有（仅父类内部用的）`、`静态（仅父类自己直接能用的）`

1. 共有: 共有者都是真正有背景的大佬，走遍天下都不怕

    - 上下文对象 this
    - 原型对象 prototype

2. 私有: 私有者都是白手起家有背影的渣渣，只敢在内部搞事情，

    - let
    - const
    - var

3. 静态: 静态者都是漂泊在外可怜的墙头草，只能依附主人狗仗人势

    - obj.attr
    - obj.fn

### 继承

继承是面对对象的 **`核心`** 大哥，封装和多态只是个弟弟可有可无

父类创建子类，子类因为封装只能 `原型链继承(通过 prototype)` 和 `实例化继承(通过 this)` 共有数据

### 多态

子类通过 `原型链继承(通过 prototype)` 得到的方法，但因为子类们之间的不同，执行方法得到结果也不同。

例如：🐲 动物类都可以说话，但 🐱 猫猫只会喵喵喵，🐶 狗子只会汪汪汪，🐷 臭猪只会哼哼哼。

## JS 如何实现封装?

1. 伪类（new Fn()）

【摘录自蝴蝶书第 5 章 继承】

它可以给不熟悉 JS 语言的程序员提供便利，但它也隐藏了 JS 语言的真实的本质（原型）。

借鉴类的表示法可能误导程序员去编写过于深入与复杂的层次结构。

许多复杂的类层次结构产生原因就是静态类型检查的约束。

JS 是一门弱类型语言，完全摆脱了那些约束。

但 JS 一样可以做到类的表示法.

```js
function ParentClass() {
    var privateAttr = "私有变量";
    var privateFunc = () => "私有方法";

    this.publicInstanceAttr = "公有变量-实例化";
    this.publicInstanceFunc = () => "公有方法-实例化";
}
ParentClass.staticAttr = "静态属性";
ParentClass.staticFunc = () => "静态方法";

ParentClass.prototype.publicProtoAttr = "公有变量-原型链";
ParentClass.prototype.publicProtoFunc = () => "公有方法-原型链";

console.log(ParentClass);
// 输出：
// ƒ ParentClass() {
//     var privateAttr = "私有变量";
//     var privateFunc = () => "私有方法";

//     this.publicInstanceAttr = "公有变量-实例化";
//     this.publicInstanceFunc = () => "公有方法-实例化";
// }

var instance = new ParentClass();
console.log(!!instance.staticAttr); // false
console.log(!!instance.staticFunc); // false
console.log(!!instance.privateAttr); // false
console.log(!!instance.privateFunc); // false
console.log(!!instance.publicInstanceAttr); // true
console.log(!!instance.publicInstanceFunc); // true
console.log(!!instance.publicProtoAttr); // true
console.log(!!instance.publicProtoFunc); // true
console.log(instance);

// 输出：
// ParentClass {
//     publicInstanceAttr: "公有变量-实例化"
//     publicInstanceFunc: () => "公有方法-实例化"
//     __proto__: {
//         publicProtoAttr: "公有变量-原型链"
//         publicProtoFunc: "公有方法-原型链"
//         constructor: ƒ ParentClass()
//              staticAttr: "静态属性"
//              staticFunc: () => "静态方法"
//              arguments: null
//              caller: null
//              length: 0
//              name: name: "ParentClass"
//         __proto__: Object
//     }
// }
```

2. 原型 (Object.create())

在一个纯粹的原型模式中，我们会摒弃类，转而专注与对象。因为 JS 中基于原型的继承比基于类的继承在概念上更简单。

```js
var Parent = {
    protoName: "原型属性",
    protoFunc: function () {
        console.log("原型方法");
        console.log("原型方法访问原型属性：", this.protoName);
        console.log("原型方法访问实例属性：", this.instanceName);
    }
};
var instance = Object.create(Parent);
instance.instanceName = "实例属性";
instance.protoFunc();

// 输出：
// 原型方法
// 原型方法访问原型属性： 原型属性
// 原型方法访问实例属性： 实例属性
```

3. 其他（IIFE）

```js
/**
 * 父类是个立即执行函数
 */
var ParentClass = (function () {
    var priviteAttr = "私有属性";
    var priviteFunc = () => "私有方法";

    return {
        publicAttr: "公有属性",
        publicFunc: () => "公有方法",
        publicVistorPriviteAttr: priviteAttr, // 公有访问私有
        publicVistorPriviteFunc: priviteFunc // 公有访问私有
    };
})();
```

4.  类 class

```js
class Parent {
    // protoAttr: "公有变量-原型链"; // Uncaught SyntaxError: cuoUnexpected identifier
    // static staticAttr: 1 // Uncaught SyntaxError: cuoUnexpected identifier
    constructor() {
        this._name = "数据劫持";
        this.publicAttr = "公有变量-实例化";
        this.publicFunc = () => "公有方法-实例化";
    }
    get name() {
        // getter
        return this._name;
    }
    set name(name) {
        // setter
        this._name = name;
    }
    static staticFunc() {
        console.log("静态方法");
    }
    protoFunc() {
        console.log("公有方法-原型链");
    }
    // 工厂模式
    static create() {
        return new Parent();
    }
}

Parent.staticFunc2 = () => "静态方法-外部";

Parent.prototype.protoFunc2 = () => "公有方法-原型链-外部";

var instance = Parent.create();
console.log(instance);
// 输出
// Parent {
//      publicAttr: "公有变量-实例化"
//      publicFunc: () => "公有方法-实例化"
//      _name: "数据劫持"
//      name: (...)
//      __proto__: {
//          protoFunc2: () => "公有方法-原型链-外部"
//          constructor: class Parent
//          name: (...)
//          protoFunc: ƒ protoFunc()
//          get name: ƒ name()
//          set name: ƒ name(name)
//          __proto__: Object
//      }
// }

// 基类 => 派生类
class Child extends Parent {
    // constructor 可选，在派生类中选了就必须 super() 或者 返回一个对象
    constructor() {
        // super 之前没有 this
        // super 只属于派生类
        // super 不能单独使用，只能 super() 或者 super.parentStaticeFunc()
        super(); // 等同于 super.constructor(), 调用父类的构造函数，将返回的实例赋值给 this
    }
}
// 类 => 实例
var childInstance = new Child();
console.log(childInstance);
// 输出：
// Child {
//     publicAttr: "公有变量-实例化"
//     publicFunc: () => "公有方法-实例化"
//     _name: "数据劫持"
//     name: (...)
//     __proto__: Parent
// }
```

## JS 如何实现继承？

JS 继承的本质都是 ` 1️⃣ 实例化继承(通过 this)` 和 ` 2️⃣ 原型链继承(通过 prototype)`

1. 原型链继承 2️⃣
2. 盗用构造函数继承 1️⃣
3. 原型链继承 + 盗用构造函数继承 = 组合继承 1️⃣2️⃣
4. 原型式继承 === `Object.create()` 1️⃣2️⃣
5. 寄生形式继承 1️⃣2️⃣
6. 寄生组合式继承 1️⃣2️⃣
7. 类 `class` 1️⃣2️⃣
