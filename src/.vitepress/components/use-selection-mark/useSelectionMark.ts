import { ShallowRef, h, onMounted, render, shallowRef, nextTick } from 'vue';

export const ANCHOR_STYLE = `
.use-selection-mark {
	position: fixed;
	top: 0;
	left: 0;
	height: 20px;
	width: auto;
	background-color: #fefefe;
	font-size: 14px;
	line-height: 20px;
	color: #333;
	padding: 2px 4px;
	border-radius: 4px;
	transform: translate(-50%, -100%);
	user-select: none;
	box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
	box-sizing: content-box;
}
.use-selection-mark-order {
	display: inline-block;
	min-width: 2em;
	text-align: center;
}
.use-selection-mark-edit {
	display: inline-block;
	padding: 0 4px;
	margin: 0 4px;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	cursor: pointer;
}
.use-selection-mark-delete {
	display: inline-block;
	cursor: pointer;
}
.use-selection-mark-edit:hover,
.use-selection-mark-delete:hover {
    color: black;
    font-weight: 500;
}
`;

export interface Hi {
	add(r: Range): void;
	values(): Iterable<Range>;
}

export interface RangeStore {
	index: number;
	live: boolean; // 是否是有效的存活对象
	content: string;
	startOffset: number;
	endOffset: number;
	startNodeParent: string;
	startNodeIndex: number;
	endNodeParent: string;
	endNodeIndex: number;
	markdown?: Record<string, any> | string;
}

export interface HiStyle {
	name: string;
	color: string;
	bgColor: string;
}

export interface Conf {
	rootSelector: string;
	options?: Partial<HiStyle>;
	onDeleteBefore?(currentStore: RangeStore): boolean;
	onDeleteAfter?(currentStore: RangeStore): void;
	onEdit?(activeRangeIndex: number, store: ShallowRef<RangeStore[]>): void;
}

export interface Result {
	deleteRange: () => void;
	editRange: () => void;
	store: ShallowRef<RangeStore[]>;
	hi: any;
	cssHi: any;
	anchorElement: HTMLElement;
}

export function createCSSHightlightStyle(item: HiStyle) {
	const name = `${item.name}`;
	let old = document.head.querySelector(`style[name=${name}]`);
	if (!old) {
		old = document.createElement('style');
		old.setAttribute('type', 'text/css');
		old.setAttribute('name', name);
		document.head.appendChild(old);
	}
	old.textContent = `
	::highlight(${name}) {
		background-color: ${item.bgColor};
		color: ${item.color};
	}`;
}

export function createAnchor(deleteRange: any, editRange: any): HTMLElement {
	// const hash = new Date(new Date().toDateString()).getTime();
	const anchor = document.querySelector('.use-selection-mark') as HTMLElement;
	if (anchor) return anchor;
	const vnode = h('div', { class: 'use-selection-mark' }, [
		h('span', { class: 'use-selection-mark-order' }, '1'), // order
		h('span', { class: 'use-selection-mark-edit', onClick: editRange }, '编辑'), // edit
		h('span', { class: 'use-selection-mark-delete', onClick: deleteRange }, '删除') // delete
	]);
	const vnodeStyle = h('style', { type: 'text/css', name: 'use-selection-mark-anchor' }, ANCHOR_STYLE);
	render(vnode, document.body);
	render(vnodeStyle, document.head);
	return vnode.el as HTMLElement;
}

export function createHighlight() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new window.Highlight();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function createCSSHighlights() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return CSS.highlights;
}

export function getElementSelector(element: Element): string {
	if (element instanceof Element === false) return '*';
	// 存储CSS路径的数组
	const path: string[] = [];
	// 循环遍历节点直到HTML标签
	while (element && element.nodeName && element.nodeName.toLowerCase() !== 'html') {
		let selector = element.nodeName.toLowerCase();
		if (element.id) {
			// 如果元素有ID属性，则将ID添加到选择器中
			selector += '#' + element.id;
			path.unshift(selector);
			break;
		} else if (element.parentElement) {
			// 如果元素没有ID属性，判断是否存在同类型兄弟元素
			let list: Element[] = Array.from(element.parentElement.children);
			let hasSameElement = list.some((i) => {
				return i !== element && i.nodeName === element.nodeName;
			});
			if (hasSameElement) {
				const index = list.indexOf(element) + 1;
				selector += ':nth-child(' + index + ')';
			}
			path.unshift(selector); // 将选择器添加到路径数组中
		}
		element = element.parentElement as Element; // 移动到父节点以继续遍历
	}
	// 返回CSS路径的字符串形式
	return path.join(' > ');
}

export function getNodeSelector(node: Node) {
	const parentElement = node.parentElement as HTMLElement;
	const childNodes = Array.from(parentElement.childNodes) as Node[];
	return {
		selector: getElementSelector(parentElement),
		index: childNodes.indexOf(node)
	};
}

export function updateStore(name: string, hi: Hi, store: ShallowRef<RangeStore[]>) {
	const list: Range[] = Array.from(hi.values());
	store.value = list.map((range, index) => {
		const { selector: startNodeParent, index: startNodeIndex } = getNodeSelector(range.startContainer);
		const { selector: endNodeParent, index: endNodeIndex } = getNodeSelector(range.endContainer);
		return {
			index,
			live: true,
			content: range.toString().trim(),
			startOffset: range.startOffset,
			endOffset: range.endOffset,
			startNodeParent,
			startNodeIndex,
			endNodeParent,
			endNodeIndex
		};
	});
	localStorage.setItem(name, JSON.stringify(store.value));
	return store;
}

export function loadStore(name: string, hi: Hi, store: ShallowRef<RangeStore[]>, rootNode: Node) {
	const old = JSON.parse(localStorage.getItem(name) || '[]') as RangeStore[];
	store.value = old.map((item) => {
		const startNodeParent = document.querySelector(item.startNodeParent);
		const endNodeParent = document.querySelector(item.endNodeParent);
		if (startNodeParent && endNodeParent) {
			const startContainer = startNodeParent.childNodes[item.startNodeIndex];
			const endContainer = endNodeParent.childNodes[item.endNodeIndex];
			const r = new Range();
			startContainer && r.setStart(startContainer, item.startOffset);
			endContainer && r.setEnd(endContainer, item.endOffset);
			const b1 = rootNode.contains(r.startContainer);
			const b2 = rootNode.contains(r.endContainer);
			const b3 = r.toString().trim() === item.content;
			if (b1 && b2 && b3 && item.content) {
				hi.add(r);
			} else {
				item.live = false;
			}
		}
		return item;
	});
}

export function createFromPoint(x: number, y: number) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (document.caretPositionFromPoint) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return document.caretPositionFromPoint(x, y);
	} else if (document.caretRangeFromPoint) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return document.caretRangeFromPoint(x, y);
	}
	return document.createRange();
}

export function isPointInRange(pointRange: Range, range: Range) {
	const b1 = range.isPointInRange(pointRange.startContainer, pointRange.startOffset);
	const b2 = range.isPointInRange(pointRange.endContainer, pointRange.endOffset);
	const b3 = pointRange.isPointInRange(range.startContainer, range.startOffset);
	const b4 = pointRange.isPointInRange(range.endContainer, range.endOffset);
	return b1 || b2 || b3 || b4;
}

export function selectionHandle(name: string, hi: Hi, store: ShallowRef<RangeStore[]>, rootNode: Node) {
	const sel = document.getSelection();
	if (sel && sel.type === 'Range' && sel.anchorNode && sel.focusNode) {
		const range = new Range();
		range.setStart(sel.anchorNode, sel.anchorOffset);
		range.setEnd(sel.focusNode, sel.focusOffset);
		const isIn = Array.from(hi.values()).some((r) => {
			return isPointInRange(range, r); // 是否相交
		});
		const b1 = rootNode.contains(range.startContainer);
		const b2 = rootNode.contains(range.endContainer);
		const b3 = Boolean(range.toString().trim());
		if (!isIn && b1 && b2 && b3) {
			hi.add(range);
			updateStore(name, hi, store);
		}
	}
}

export function useSelectionMark(config: Conf): Result {
	const store = shallowRef<RangeStore[]>([]);
	const hiStyle: HiStyle = Object.assign(
		{
			name: 'use-selection-mark',
			bgColor: 'rgba(255, 255, 0, 0.5)',
			color: 'unset'
		},
		config.options || {}
	);
	const hi = createHighlight();
	const cssHi = createCSSHighlights();
	let anchorElement: any = null;

	let activeRange: Range | null = null;
	let activeRangeIndex: number | null = null;
	let isSelect = false;
	let timer: number | null = null;

	onMounted(() => {
		nextTick(() => {
			anchorElement = createAnchor(deleteRange, editRange);
			const rootElement = document.querySelector(config.rootSelector) as Node;
			console.log(anchorElement, rootElement);
			if (rootElement && hi && cssHi) {
				console.time('性能统计__loadStore');
				cssHi.set(hiStyle.name, hi);
				createCSSHightlightStyle(hiStyle);
				loadStore(hiStyle.name, hi, store, rootElement);
				document.addEventListener('mouseup', () => onMouseup(rootElement));
				document.addEventListener('mousemove', onMousemove);
				document.addEventListener('selectionchange', onSelect);
				console.timeEnd('性能统计__loadStore');
			}
		});
	});

	function deleteRange() {
		const currentStore = store.value[activeRangeIndex as number];
		if (typeof config.onDeleteBefore === 'function') {
			const bool = config.onDeleteBefore(currentStore);
			if (bool === false) return;
		}
		activeRange && hi.delete(activeRange);
		updateStore(hiStyle.name, hi, store);
		resetAnchor();
		if (typeof config.onDeleteAfter === 'function') {
			config.onDeleteAfter(currentStore);
		}
	}

	function editRange() {
		if (typeof config.onEdit === 'function') {
			config.onEdit(activeRangeIndex as number, store);
		} else alert(`编辑 store[${activeRangeIndex}]`);
	}

	function resetAnchor() {
		activeRange = null;
		anchorElement.style.left = -10000 + 'px';
		anchorElement.style.top = -10000 + 'px';
	}

	function onMouseup(rootNode: Node) {
		console.time('性能统计__selectionHandle');
		isSelect && anchorElement && selectionHandle(hiStyle.name, hi, store, rootNode);
		isSelect = false;
		console.timeEnd('性能统计__selectionHandle');
	}

	function onSelect() {
		isSelect = true;
	}

	function onMousemove(e: MouseEvent) {
		const pointRange: Range = createFromPoint(e.clientX, e.clientY);
		for (let range of hi.values() as Iterable<Range>) {
			if (isPointInRange(pointRange, range)) {
				activeRange = range;
				const { x, y } = activeRange.getClientRects()[0];
				const list = Array.from(hi.values());
				activeRangeIndex = list.indexOf(activeRange) + 1;
				anchorElement.children[0].textContent = `${activeRangeIndex}/${list.length}`;
				anchorElement.style.left = x + 'px';
				anchorElement.style.top = y + 'px';
				timer && clearTimeout(timer);
				break;
			} else {
				timer && clearTimeout(timer);
				timer = setTimeout(() => {
					resetAnchor();
					timer = null;
				}, 500);
			}
		}
	}

	return { deleteRange, editRange, store, hi, cssHi, anchorElement };
}
