let uid = 0;
let remove = () => {};

export default class Dep {
	static target;
	id;
	subs;

	constructor() {
		this.id = uid++;
		this.subs = [];
	}

	addSub(sub) {
		this.subs.push(sub);
	}

	removeSub(sub) {
		remove(this.subs, sub);
	}

	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}

	notify() {
		// stabilize the subscriber list first
		const subs = this.subs.slice();
		for (let i = 0, l = subs.length; i < l; i++) {
			subs[i].update();
		}
	}
}
