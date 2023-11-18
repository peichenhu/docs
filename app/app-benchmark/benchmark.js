var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

function run(...args) {
    args.forEach((obj) => {
        const [fn, ...rest] = obj;
        suite.add(fn.name, () => fn(...rest));
    });
    suite.on("cycle", function (event) {
        console.log(String(event.target));
    });
    suite.on("complete", function () {
        const name = this.filter("fastest").map("name");
        console.log("complete:", name, "is fastest!");
    });
    suite.run({ async: true });
}

module.exports = run;
