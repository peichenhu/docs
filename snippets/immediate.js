// 立即执行后间歇一段时间可以再立即执行
function immediate(fn, delay = 500) {
    let t = null;
    return (...args) => {
        if (t) return; // 歇
        fn(...args); // 立即执行
        t = setTimeout(() => {
            t = null;
        }, delay);
    };
}
const fn = (arg) => console.log(arg, Date.now());
const fnImmediate = immediate(fn);
console.log(0, Date.now());
setTimeout(() => fnImmediate(200), 200);
setTimeout(() => fnImmediate(500), 500);
setTimeout(() => fnImmediate(800), 800);
