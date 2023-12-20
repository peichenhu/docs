import { type ObjectDirective, ref, reactive } from 'vue';

export interface Scroll {
	isToTop: boolean;
	y: number;
}

export interface observerElement extends HTMLElement {
	__expose__: boolean;
	__observerFn__: any;
}

export function usevScrollY() {
	const scroll: Scroll = reactive({
		isToTop: true,
		y: 0
	});

	function onScroll(e: Event) {
		const el = e.target as HTMLElement;
		scroll.isToTop = el.scrollTop - scroll.y >= 0;
		scroll.y = el.scrollTop;
	}

	const vScrollY: ObjectDirective = {
		beforeMount(el: HTMLElement) {
			el.addEventListener('scroll', onScroll);
		},
		beforeUnmount(el: HTMLElement) {
			el.removeEventListener('scroll', onScroll);
		}
	};

	return { scroll, vScrollY };
}

export function useVirtualList(dataList = [] as any[], scroll: Scroll) {
	// 配置
	const config = {
		startIndex: 0, // 虚拟列表区间开始索引
		endIndex: 10, // 虚拟列表区间结束索引
		cacheAfter: 20, // buffer 前缓冲区
		cacheBefore: 20, // buffer 后缓冲区
		isExposeRuning: false, // 开始曝光回调函数任务执行状态
		isEndExposeRuning: false // 结束曝光回调函数任务执行状态
	};
	// 虚拟列表
	const vList = ref(dataList.slice(config.startIndex, config.endIndex));
	/**
	 * 开始曝光
	 * 处理：添加上区间备用数据
	 * 处理：添加下区间备用数据
	 */
	function expose(el: HTMLElement) {
		// 工作状态加锁
		if (config.isExposeRuning) return;
		config.isExposeRuning = true;
		// 必须含有当前元素的索引下标
		if (el.dataset.index === undefined) return;
		const { cacheAfter, cacheBefore } = config;
		const index = +el.dataset.index;
		// 根据滚动方向处理
		if (scroll.isToTop) {
			while (config.endIndex - index < cacheAfter && config.endIndex < dataList.length) {
				// console.count('添加下区间备用数据');
				vList.value.push(dataList[config.endIndex]);
				config.endIndex += 1;
			}
		} else {
			while (index - config.startIndex < cacheBefore && config.startIndex > 0) {
				// console.count('添加上区间备用数据');
				vList.value.unshift(dataList[config.startIndex - 1]);
				config.startIndex -= 1;
			}
		}
		config.isExposeRuning = false;
	}
	/**
	 * 结束曝光
	 * 处理：删除上区间多余数据
	 * 处理：删除下区间多余数据
	 */
	function endExpose(el: HTMLElement) {
		// 工作状态加锁
		if (config.isEndExposeRuning) return;
		config.isEndExposeRuning = true;
		// 必须含有当前元素的索引下标
		if (el.dataset.index === undefined) return;
		const index = +el.dataset.index;
		const { cacheAfter, cacheBefore } = config;
		// 根据滚动方向处理
		if (scroll.isToTop) {
			while (index - config.startIndex > cacheBefore) {
				// console.count('处理：删除上区间多余数据--向上结束曝光');
				vList.value.shift();
				config.startIndex += 1;
			}
		} else {
			// 亲近结束位置，向下结束曝光
			while (config.endIndex - index > cacheAfter) {
				// console.count('处理：删除下区间多余数据--向下结束曝光');
				vList.value.pop();
				config.endIndex -= 1;
			}
		}
		config.isEndExposeRuning = false;
	}

	const vObserver: ObjectDirective = {
		beforeMount: (el) => {
			const io = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					const el = entry.target as observerElement;
					if (entry.intersectionRatio > 0) {
						el.__expose__ = true;
						expose(el); // 开始曝光
					} else if (el.__expose__) {
						endExpose(el); // 结束曝光
					}
				});
			});
			io.observe(el);
			// el.__observerFn__ = io;
		}
	};
	return { vObserver, vList };
}
