import { onMounted, nextTick, ref, onUpdated, onBeforeUnmount } from 'vue';

export interface Hi {
	clear(): void;
	add(r: Range): void;
}

export interface RangeItem {
	matchText?: string;
	startNode: Node;
	startIndex: number;
	endNode: Node;
	endIndex: number;
}

export interface Keyword {
	name: string;
	color: string;
	bgColor: string;
	list: string[];
}

export interface Options {
	root: string;
	keywords: Array<Keyword>;
}

export function createHighlight() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return new window.Highlight();
}

export function createCSSHighlights() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return CSS.highlights;
}

export function createHi(key: string): Hi {
	const hi = createHighlight();
	const hiCSS = createCSSHighlights();
	hiCSS.set(key, hi);
	return hi;
}

export function findAll(text: string, el: Element): RangeItem[] {
	const ans = new Set<RangeItem>();
	const current: RangeItem = {
		matchText: text,
		startNode: el,
		startIndex: 0,
		endNode: el,
		endIndex: 0
	};

	function addAns() {
		ans.add({
			startNode: current.startNode,
			startIndex: current.startIndex,
			endNode: current.endNode,
			endIndex: current.endIndex
		});
	}

	/**
	 * 开始匹配 ？
	 * matchText(ab) vs content(abc) ?
	 * matchText(ab) vs content(ab) ?
	 * matchText(ab) vs content(a) ?
	 */
	let matching = false;
	function match(child: Node, position = 0) {
		let content = child.textContent || '';
		const matchText: string = current.matchText || '';
		let matchStartIndex = 0;
		if (matching === false) {
			matchStartIndex = content.indexOf(matchText.charAt(0), position);
			matching = matchStartIndex !== -1;
			if (matching) {
				current.startNode = child;
				current.startIndex = matchStartIndex;
			}
		}
		if (matching) {
			const subContent = content.slice(matchStartIndex);
			if (matchText.length > subContent.length) {
				// matchText(ab) vs subContent(a) ?
				matching = matchText.slice(0, subContent.length) === subContent;
				if (matching) {
					current.matchText = matchText.slice(subContent.length);
				} else {
					current.matchText = text;
					position = matchStartIndex + 1;
					if (content.indexOf(text.charAt(0), position) !== -1) {
						match(child, position);
					}
				}
			} else if (matchText.length < subContent.length) {
				// matchText(ab) vs subContent(abc) ?
				if (subContent.slice(0, matchText.length) === matchText) {
					current.endNode = child;
					current.endIndex = matchStartIndex + matchText.length - 1;
					addAns();
					position = current.endIndex + 1;
				} else {
					position = matchStartIndex + 1;
				}
				matching = false;
				current.matchText = text;
				if (content.indexOf(text.charAt(0), position) !== -1) {
					match(child, position);
				}
			} else {
				// matchText(ab) vs subContent(ab) ?
				if (subContent === matchText) {
					current.endNode = child;
					current.endIndex = matchStartIndex + matchText.length - 1;
					addAns();
				}
				matching = false;
				current.matchText = text;
				position = matchStartIndex + 1;
				if (content.indexOf(text.charAt(0), position) !== -1) {
					match(child, position);
				}
			}
		}
	}

	function isShow(el: HTMLElement) {
		// return true;
		// 方案 1：使用 el.offsetWidth > 0，性能最差 100ms 左右
		// 方案 2：使用 getComputedStyle.display !== 'none'，性能一般 20ms 左右
		return el.style.getPropertyValue('display') !== 'none';
	}

	function dfs(node: Node) {
		if (node.hasChildNodes()) {
			node.childNodes.forEach((child) => dfs(child));
		} else if (node.nodeType === Node.TEXT_NODE && node.isConnected && isShow(node.parentElement as HTMLElement)) {
			match(node, 0);
		}
	}

	dfs(el);

	return Array.from(ans);
}

export function createCSSHightlightStyle(item: Keyword) {
	const name = `highlight-${item.name}`;
	let old = document.head.querySelector(`style[name=${name}]`);
	if (!old) {
		old = document.createElement('style');
		old.setAttribute('type', 'text/css');
		old.setAttribute('name', name);
		document.head.appendChild(old);
	}
	old.innerHTML = `
	::highlight(${name}) {
		background-color: ${item.bgColor};
		color: ${item.color};
	}`;
}

export function observe(el: HTMLElement, callback: () => void) {
	const config = { attributes: true, childList: true, subtree: true };
	const observer = new MutationObserver(callback);
	observer.observe(el, config);
	return observer;
}

export function main(rootEle: HTMLElement, keywords: Keyword[], rangeList: Range[]) {
	const timer = [new Date().toISOString(), '关键词高亮耗时'].join('--');
	console.time(timer);
	// 优化：最大容器重绘一次，避免子元素每个都重绘才能拿到最终 CSSStyleDeclaration 对象
	window.getComputedStyle(rootEle, null);
	let rangeList2: Range[] = [];
	const hiList = keywords.map((item) => {
		createCSSHightlightStyle(item);
		const hi = createHi(`highlight-${item.name}`);
		const list = item.list || [];
		list.forEach((text) => {
			const matchList = findAll(text, rootEle);
			matchList.forEach((item) => {
				const range = rangeList.pop() || new Range();
				range.setStart(item.startNode, item.startIndex);
				range.setEnd(item.endNode, item.endIndex + 1);
				rangeList2.push(range);
				hi.add(range);
			});
		});
		return hi;
	});
	rangeList.length = 0;
	rangeList2.forEach((i) => rangeList.push(i));
	console.timeEnd(timer);
	return hiList;
}

export function useHightlight(selector: string, keywords: Keyword[]) {
	selector = selector || 'html > body';
	keywords = keywords || [];

	let ready = true;
	let hiList: Hi[] = [];
	let rootEle = ref<HTMLElement | null>(null);
	let observer: MutationObserver = null;
	let rangeList: Range[] = [];

	function reload() {
		ready = false;
		hiList.forEach((i) => i.clear());
		hiList = main(rootEle.value as HTMLElement, keywords, rangeList); // 立即执行
		ready = true;
	}

	function init() {
		rootEle.value = document.querySelector(selector) || document.body;
		if (rootEle) {
			reload();
			observer = observe(rootEle.value as HTMLElement, () => {
				ready && reload();
			});
		}
	}

	onMounted(() => nextTick(init));
	onBeforeUnmount(() => {
		observer && observer.disconnect();
	});
	return { reload };
}
