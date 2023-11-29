class LimitPromise {
	constructor(limit = 3) {
		this.limit = limit;
		this.list = [];
		this.catchCallback = null;
		this.timer = Date.now();
	}
	add(list = []) {
		this.list = this.list.concat(list);
	}
	onCatch(callback) {
		if (typeof callback === 'function') {
			this.catchCallback = fn;
		}
	}
	patch(pm) {
		pm.finally(() => {
			this.next();
			console.log(Date.now() - this.timer);
			console.count('finally');
		}).catch((err) => {
			// console.count("callCatch");
			this.catchCallback && this.catchCallback(err);
		});
		return pm;
	}
	next() {
		const createPromise = this.list.shift();
		if (createPromise) {
			const pm = createPromise();
			const pmPatched = this.patch(pm);
			Promise.allSettled([pmPatched]);
		}
	}
	run() {
		this.timer = Date.now();
		const list = this.list.splice(0, 3);
		const listPatched = list.map((createPromise) => {
			const pm = createPromise();
			const pmPatched = this.patch(pm);
			return pmPatched;
		});
		Promise.allSettled(listPatched);
	}
}

function createPromise() {
	return new Promise((resolve, reject) => {
		if (Math.random() > 0.5) {
			setTimeout(() => {
				resolve('resolve');
			}, 500);
		} else {
			setTimeout(() => {
				reject(new Error('reject'));
			}, 500);
		}
	});
}

const list = [
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise,
	createPromise
];
const lp = new LimitPromise(3);
lp.add(list);
lp.run();

/**
 * 输出情况：
    503
    finally: 1
    512
    finally: 2
    513
    finally: 3
    1004
    finally: 4
    1014
    finally: 5
    1014
    finally: 6
    1506
    finally: 7
    1514
    finally: 8
    1515
    finally: 9
    2007
    finally: 10
 */
