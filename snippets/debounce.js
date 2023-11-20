// 多次重复触发，只执行最后一次
function debounce(fn, delay = 500) {
    let t = null;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

const fn = (arg) => console.log(arg, Date.now());
const fnDebounce = debounce(fn);
setTimeout(() => fnDebounce(200), 200);
setTimeout(() => fnDebounce(400), 400);
setTimeout(() => fnDebounce(600), 600);
