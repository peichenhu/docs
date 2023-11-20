# vue-3-diff

> 分析文件：vue@3.3.8/core/packages/runtime-core/src/renderer.ts

## 两个节点是否可复用判断

::: details isSameVNodeType

```ts
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
    return n1.type === n2.type && n1.key === n2.key;
}
```

:::

## 无 key 子序列 diff

::: details patchUnkeyedChildren

```ts
// 伪代码
const patchUnkeyedChildren = (oldCh, newCh, ...rest) => {
    oldCh = oldCh || [];
    newCh = newCh || [];
    const commonLength = Math.min(oldCh.length, newCh.length);

    for (let i = 0; i < commonLength; i++) {
        // 交集一对一辅导
        patch(oldCh[i], newCh[i], ...rest);
    }

    if (oldCh.length > newCh.length) {
        // 差集旧多新少；删除一批旧的
        unmountChildren(oldCh.slice(commonLength), ...rest);
    } else {
        // 差集旧少新多；添加一批新的
        mountChildren(newCh.slice(commonLength), ...rest);
    }
};
```

:::

## 有 key 子序列 diff

```ts
// prettier-ignore
/**
 * 五种情况处理：
 * 1. 起始位置节点类型相同。
 * 2. 结束位置节点类型相同。
 * 3. 相同部分处理完，有新增节点。
 * 4. 相同部分处理完，有旧节点需要卸载。
 * 5. 首尾相同，但中间部分存在可复用乱序节点.
 */
const patchKeyedChildren = (
    c1: VNode[], // 旧虚拟DOM
    c2: VNodeArrayChildren, // 新虚拟DOM
    container: RendererElement, // 父元素属性
    parentAnchor: RendererNode | null, // 父元素属性
    parentComponent: ComponentInternalInstance | null, // 父元素属性
    parentSuspense: SuspenseBoundary | null, // 父元素属性
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    let l2 = c2.length // 新节点个数
    let i = 0 // 起始位置
    let e1 = c1.length - 1 // 旧后
    let e2 = l2 - 1 // 新后

    /**
     * 情况 1：起始位置节点类型相同
     * 对比：新前--旧前
     * 示例：old[(a b) c]
     * 示例：new[(a b) d e]
     * 处理：相同 => 为旧节点打补丁
     */
    while (i <= e1 && i <= e2) {
      c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i]);
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
      } else {
        break
      }
      i++
    }

    /**
     * 情况 2：结束位置节点类型相同
     * 对比：新后--旧后
     * 示例：old[a (b c)]
     * 示例：new[d e (b c)]
     * 处理：相同 => 为旧节点打补丁
     */
    while (i <= e1 && i <= e2) {
      c2[e2] = optimized ? cloneIfMounted(c2[e2] as VNode) : normalizeVNode(c2[e2])
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch( n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
      } else {
        break
      }
      e1--
      e2--
    }

    /**
     * 情况 3：相同部分处理完，有新增节点。
     * 示例：old[(b c)]         old[(b c)]    
     * 示例：new[e (b c)]       new[(b c) a]
     * 处理：(i > e1 && i <= e2) => 新增节点
     */
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
        while (i <= e2) {
          c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i])
          patch(null, c2[i], container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
          i++
        }
      }
    }

    /**
     * 情况 4. 相同部分处理完，有旧节点需要卸载。
     * 示例：old[a (b c)]     old[(b c) a]    
     * 示例：new[(b c)]       new[(b c)]
     * 处理：(i <= e1 && i > e2) => 删除多余的旧节点
     */
    else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true)
        i++
      }
    }

    /**
     * 情况 5. 首尾相同，但中间部分存在可复用乱序节点.
     * 示例：old[(b c) a e f (m n)]
     * 示例：new[(b c) x e z (m n)] 
     * 处理：
     *      - 旧找新
     *          - 有则补丁
     *          - 无则删除
     *          - 生成新节点匹配标识
     *          - 生成乱序标识
     *      - 新旧结合构建最长稳定子序列，
     *      - 倒序遍历剩余新节点序列(用后一个修补的节点作为插入锚点)
     *          - 新节点属于最长稳定子序列 => 则不动
     *          - 新节点匹配标识不存在 => 则新增
     *          - 新节点不属于最长稳定子序列且匹配 => 则移动
     */
    else {
      // 1:old  2:new
      const s1 = i // 剩余旧序列开始下标
      const s2 = i // 剩余新序列开始下标

      // 剩余新子节点创建快速查找哈希表 { [key]: index }
      const keyToNewIndexMap: Map<string | number | symbol, number> = new Map()
      for (i = s2; i <= e2; i++) {
        c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i])
        const nextChild = c2[i]
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }

      let j // 可复用新节点下标
      let patched = 0 // 剩余旧节点匹配成功计数
      let toBePatched = e2 - s2 + 1;  // 剩余待匹配的新节点个数
      let moved = false // 是否乱序
      let maxNewIndexSoFar = 0 // 最大偏移，非递增则乱序

      // 剩余待匹配的新节点的匹配标识，未匹配是0，匹配是匹配的旧节点下标
      let newIndexToOldIndexMap = new Array(toBePatched).fill(0) // [0, 0, 0]

      /**
       * 1:old  2:new
       * 逻辑：遍历旧剩余序列
       * 示例：old[(b c) a e f (m n)]
       * 示例：new[(b c) x e z (m n)] 
       */
      for (i = s1; i <= e1; i++) {

        const prevChild = c1[i] // 旧剩余

        if (patched >= toBePatched) {
          // 如果 toBePatched 是 0 或者全匹配完成，那么其他旧剩余只能卸载
          unmount(prevChild, parentComponent, parentSuspense, true)
          continue
        }

        let newIndex

        if (prevChild.key != null) {
          // 用旧剩余节点的 key 尝试获取 新剩余节点
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // 尝试找一个同样没 key 但 type 相同的新剩余节点
          // newIndexToOldIndexMap[j - s2] === 0          新节点没有被匹配过
          // isSameVNodeType(prevChild, c2[j] as VNode)   仅 type 相同的可复用节点
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j] as VNode)) {
                newIndex = j
                break
            }
          }
        }

        if (newIndex === undefined) {
          // 旧剩余节点始终匹配不了就删除
          unmount(prevChild, parentComponent, parentSuspense, true)
        } else {
          /**
           * 旧剩余节点匹配
           *    newIndex                指的是 旧剩余 匹配的 新剩余的下标
           *    newIndexToOldIndexMap   指的是 剩余新节点序列匹配标识 [0, 0,...]
           *    newIndex - s2           指的是 剩余偏移量
           *    maxNewIndexSoFar        初始值 0
           * 
           * 迭代时可能 newIndex 依次是 5 3 7，从而发现乱序
           *    5 maxNewIndexSoFar = newIndex
           *    3 moved = true
           *    7 maxNewIndexSoFar = newIndex
           */
          newIndexToOldIndexMap[newIndex - s2] = i + 1 // 记录新节点匹配标识
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex // 记录最大偏移
          } else {
            moved = true // 记录乱序标识
          }
          patch(prevChild, c2[newIndex] as VNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
          patched++; // 旧节点匹配计数记录
        }
      }
      /**
       * 上述阶段总结：
       * - 新剩余创建哈希表 hash
       * - 遍历旧剩余 while
       *    - 匹配新剩余 newIndex（key 不行 type相同也行）
       *        - 记录剩余最大偏移 maxNewIndexSoFar
       *        - 记录是否乱序    moved = 剩余最大偏移 === true
       *        - 旧剩余打补丁    patch(old，new)
       *        - 记录匹配个数    patched++
       *    - 无法匹配新剩余 !newIndex
       *        - 销毁旧剩余 unmount(old)
       */

      /**
       * 逻辑：乱序整理，仅当节点移动(乱序)时生成最长的稳定子序列
       * 示例：old[(b c) a e f h k o (m n)]  => old[(b c) e f h k (m n)]
       * 示例：new[(b c) f x e z h k (m n)]  => new[(b c) f x e z h k (m n)]
       * 最长的稳定子序列: e h k
       * 乱序：f
       */
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR
      j = increasingNewIndexSequence.length - 1

      // 倒序遍历剩余新节点，以便我们可以使用后一个修补的节点作为锚点
      for (i = toBePatched - 1; i >= 0; i--) {
        // 下一个要处理的新后节点（新增或者移动）
        const nextIndex = s2 + i
        const nextChild = c2[nextIndex] as VNode

        // 使用后一个修补的节点作为锚点
        const anchor = nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor

        /**
         * 举例：old[e f h k]
         * 举例：new[f x e z h k]
         * 
         * 最长的稳定子序列: e h k
         * 乱序：f
         * j：2（最长的稳定子序列长度 - 1）
         * 
         * 倒序处理（以便我们可以使用后一个修补的节点作为锚点）
         * k 匹配且稳定     j--     i--                     old[e f h k]
         * h 匹配且稳定     j--     i--                     old[e f h k]
         * z 未匹配新增     patch   i--     anchor=h.el     old[e f z h k]
         * e 匹配且稳定     j--     i--                     old[e f z h k]
         * x 未匹配新增     patch   i--     anchor=e.el     old[x e f z h k]
         * f j<0          move    i--     anchor=x.el     old[f x e f z h k]
         */
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, MoveType.REORDER)
          } else {
            j--
          }
        }
      }
    }
  }
```
