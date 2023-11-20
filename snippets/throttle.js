// 每隔单位时间，只执行一次
function throttle(fn, delay = 500) {
    let t = null;
    return (...args) => {
        if (t) return;
        t = setTimeout(() => {
            fn(...args);
            t = null;
        }, delay);
    };
}

const obj = { msg: "obj", time: Date.now() };
const fn = function (arg) {
    let delay = Date.now() - this.time;
    this.time = Date.now();
    console.log("this: %s; 参数: %s; 输出间隔时间: %s", this.msg, arg, delay);
};
const fnBind = fn.bind(obj);
const fnBindThrottle = throttle(fnBind);
fnBind(0);
setTimeout(() => fnBindThrottle(200), 200);
setTimeout(() => fnBindThrottle(500), 500);
setTimeout(() => fnBindThrottle(510), 510);
setTimeout(() => fnBindThrottle(1000), 1000);
/**
 * 输出日志：
 *  this: obj; 参数: 0; 输出间隔时间: 0
 *  this: obj; 参数: 200; 输出间隔时间: 706
 *  this: obj; 参数: 1000; 输出间隔时间: 803
 */
