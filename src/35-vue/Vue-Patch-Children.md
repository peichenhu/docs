## mountChildren 和 unmountChildren

```ts
// 挂载一批节点
const mountChildren: MountChildrenFn = (...args) => {
    let [children, ...rest, optimized, start = 0] = args;
    for (let i = start; i < children.length; i++) {
        const child = (children[i] = optimized
            ? cloneIfMounted(children[i] as VNode)
            : normalizeVNode(children[i]));
        patch(null, child, ...rest, optimized);
    }
};

// 卸载一批节点
const unmountChildren: UnmountChildrenFn = (...args) => {
    let [children, ...rest, start = 0] = args;
    for (let i = start; i < children.length; i++) {
        unmount(children[i], ...rest);
    }
};
```

## patchUnkeyedChildren

```ts
// core/packages/runtime-core/src/renderer.ts

/**
 * 比较 “Unkeyed” 的 children 数据
 * @param { VNode[] } c1 oldChildren
 * @param { VNodeArrayChildren } c1 newChildren
 * @param { boolean } optimized 优化标识
 * @param {*} 忽略其他参数
 */
const patchUnkeyedChildren = (...args) => {
    let [c1, c2, ...rest, optimized] = args;
    c1 = c1 || [];
    c2 = c2 || [];
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    // 交集一对一辅导
    for (let i = 0; i < commonLength; i++) {
        const nextChild = (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i]));
        patch(/** 参数略 */);
    }
    // 差集
    if (oldLength > newLength) {
        // 旧多新少；删除一批旧的
        unmountChildren(/** 参数略 */);
    } else {
        // 旧少新多；添加一批新的
        mountChildren(/** 参数略 */);
    }
};
```

## patchKeyedChildren

```ts
// can be all-keyed or mixed 可以全部键控或混合

/**
 * 比较 “Unkeyed” 的 children 数据
 * @param { VNode[] } c1 oldChildren
 * @param { VNodeArrayChildren } c1 newChildren
 * @param { boolean } optimized 优化标识
 * @param {*} 忽略其他参数
 */
const patchKeyedChildren = (
    c1: VNode[],
    c2: VNodeArrayChildren,
    container: RendererElement,
    parentAnchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
) => {
    let get = (array, i) => {
        return optimized
            ? cloneIfMounted(array[i] as VNode)
            : normalizeVNode(array[i]);
    };
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1; // prev ending index 旧尾
    let e2 = l2 - 1; // next ending index 新尾

    // 1. sync from start 前交集
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = (c2[i] = get(c2, i));
        if (!isSameVNodeType(n1, n2)) break;
        patch(/** 参数省略 */); // 一对一辅导
        i++;
    }

    // 2. sync from end 后交集
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = (c2[e2] = get(c2, e2));
        if (!isSameVNodeType(n1, n2)) break;
        patch(/** 参数省略 */);
        e1--;
        e2--;
    }

    // 3. common sequence + mount 共有序列 + 挂载
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2  ==> 相当于 newChildren.push(c)
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0 ===> 相当于 newChildren.unshift(c)
    if (i > e1) {
        // i > e1 说明 oldChildren 全部排查完毕
        if (i <= e2) {
            // i > e1 且 i <= e2 说明 oldChildren 全部排查完，newChildren 存在未排查项
            // 然后只需要处理 newChildren 的未排查项即可
            const nextPos = e2 + 1;
            const anchor =
                nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor;
            while (i <= e2) {
                const n2 = (c2[i] = get(c2, i));
                patch(
                    null,
                    (c2[i] = get(c2, i)),
                    container,
                    anchor
                    /** 参数省略 */
                );
                i++;
            }
        }
    }

    // 4. common sequence + unmount 公共序列 + 卸载
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1 相当于 newChildren.pop()
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1 相当于 newChildren.shift()
    else if (i > e2) {
        while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
        }
    }

    // 5. unknown sequence 未知序列；新旧都没排查完
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
        const s1 = i; // prev starting index
        const s2 = i; // next starting index

        // 5.1 build key:index map for newChildren 生成键：newChildren的索引映射
        const keyToNewIndexMap: Map<string | number | symbol, number> =
            new Map();
        for (i = s2; i <= e2; i++) {
            const nextChild = (c2[i] = optimized
                ? cloneIfMounted(c2[i] as VNode)
                : normalizeVNode(c2[i]));
            if (nextChild.key != null) {
                if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
                    warn(
                        `Duplicate keys found during update:`,
                        JSON.stringify(nextChild.key),
                        `Make sure keys are unique.`
                    );
                }
                keyToNewIndexMap.set(nextChild.key, i);
            }
        }

        // 5.2 loop through old children left to be patched and try to patch
        // matching nodes & remove nodes that are no longer present
        // 5.2 绕过需要修补的老人并尝试修补匹配节点 & 删除不再存在的节点
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        // used to track whether any node has moved
        let maxNewIndexSoFar = 0;
        // works as Map<newIndex, oldIndex>
        // Note that oldIndex is offset by +1
        // and oldIndex = 0 is a special value indicating the new node has
        // no corresponding old node.
        // used for determining longest stable subsequence
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

        for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
                // all new children have been patched so this can only be a removal
                unmount(prevChild, parentComponent, parentSuspense, true);
                continue;
            }
            let newIndex;
            if (prevChild.key != null) {
                newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
                // key-less node, try to locate a key-less node of the same type
                for (j = s2; j <= e2; j++) {
                    if (
                        newIndexToOldIndexMap[j - s2] === 0 &&
                        isSameVNodeType(prevChild, c2[j] as VNode)
                    ) {
                        newIndex = j;
                        break;
                    }
                }
            }
            if (newIndex === undefined) {
                unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
                newIndexToOldIndexMap[newIndex - s2] = i + 1;
                if (newIndex >= maxNewIndexSoFar) {
                    maxNewIndexSoFar = newIndex;
                } else {
                    moved = true;
                }
                patch(
                    prevChild,
                    c2[newIndex] as VNode,
                    container,
                    null,
                    parentComponent,
                    parentSuspense,
                    isSVG,
                    slotScopeIds,
                    optimized
                );
                patched++;
            }
        }

        // 5.3 move and mount
        // generate longest stable subsequence only when nodes have moved 仅当节点移动时生成最长的稳定子序列
        const increasingNewIndexSequence = moved
            ? getSequence(newIndexToOldIndexMap)
            : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        // looping backwards so that we can use last patched node as anchor
        for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex] as VNode;
            const anchor =
                nextIndex + 1 < l2
                    ? (c2[nextIndex + 1] as VNode).el
                    : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
                // mount new
                patch(
                    null,
                    nextChild,
                    container,
                    anchor,
                    parentComponent,
                    parentSuspense,
                    isSVG,
                    slotScopeIds,
                    optimized
                );
            } else if (moved) {
                // move if:
                // There is no stable subsequence (e.g. a reverse)
                // OR current node is not among the stable sequence
                if (j < 0 || i !== increasingNewIndexSequence[j]) {
                    move(nextChild, container, anchor, MoveType.REORDER);
                } else {
                    j--;
                }
            }
        }
    }
};
```
