# vue-2-diff

> 分析文件：vue@2.5.16/src/core/vdom/patch.js

## 前置分析

### insertBefore

```js
// 语法
var insertedNode = parentNode.insertBefore(newNode, referenceNode);

// insertedNode         被插入节点 (newNode)
// parentNode           新插入节点的父节点
// newNode              用于插入的节点
// referenceNode        newNode 将要插在这个节点之前

// 如果 referenceNode 为 null 则 newNode 将被插入到子节点的末尾*。*
```

### nextSibling

Node.nextSibling 是一个只读属性，
返回其父节点的 childNodes 列表中紧跟在其后面的节点，
如果指定的节点为最后一个节点，则返回 null。

### insertBefore

```js
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
```

### VNode

```js
// prettier-ignore
var VNode = function VNode(tag,data,children,text,elm,context,componentOptions,asyncFactory) {
    this.tag = tag; // 节点标签
    this.data = data; // 节点数据对象
    this.children = children; // 节点的子节点
    this.text = text; // 节点的文本
    this.elm = elm; // 节点的真实 DOM
    this.ns = undefined; // 节点的命名空间
    this.context = context; // 节点的编译作用域 vm
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key; // 节点的 key 属性，被当作节点的标志，用以优化
    this.componentOptions = componentOptions; // 当前节点对应的组件的 option 选项
    this.componentInstance = undefined; // 当前节点对应的组件的实例
    this.parent = undefined; // 当前节点的父节点
    this.raw = false; // 原生 HTML 或只是普通文本
    this.isStatic = false; // 静态节点标志
    this.isRootInsert = true; // 是否作为根节点插入
    this.isComment = false; // 是否为注释节点
    this.isCloned = false; // 是否为克隆节点
    this.isOnce = false; // 是否有v-once指令
    this.asyncFactory = asyncFactory; // 异步工厂
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
};

// var node = new VNode();
```

### createKeyToOldIdx

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    // 区间
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) {
            // 没有 key 时，将索引 index 作为 key
            map[key] = i;
        }
    }
    return map;
}
```

### findIdxInOld

```js
// 从旧子节点区间列表 中查找和 新子节点 newNode 相同的 旧子节点
function findIdxInOld(newNode, oldCh, start, end) {
    // 区间
    for (var i = start; i < end; i++) {
        var c = oldCh[i];
        // 相同
        if (isDef(c) && sameVnode(newNode, c)) {
            return i;
        }
    }
}
```

### isDef

```js
function isDef(v) {
    return v !== undefined && v !== null;
}
```

### sameInputType

```js
// var isTextInputType = makeMap('text,number,password,search,email,tel,url');

function sameInputType(a, b) {
    if (a.tag !== "input") return true;
    let i;
    const typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
    const typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
    return (
        typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB))
    );
}
```

### sameVnode

```js
// prettier-ignore
function sameVnode (a, b) {
  return (
    // 条件：key 相同
    a.key === b.key && (
      (
        // 条件：tag 相同
        a.tag === b.tag &&
        // 条件：都是空或者非空的VNode
        a.isComment === b.isComment &&
        // 条件：data 存在
        isDef(a.data) === isDef(b.data) &&
        // 条件：都是 Input 类型
        sameInputType(a, b)
      ) || (
        // 条件：都是异步
        isTrue(a.isAsyncPlaceholder) &&
        // 条件：异步工厂
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

## 核心分析

### patchVnode

```js
function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    // 判断：完全一致，不处理
    if (oldVnode === vnode) return;

    // 处理：获取并传递真实 DOM
    const elm = (vnode.elm = oldVnode.elm);

    // 判断：异步
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
            // 水合。因为它们已在客户端上呈现或不需要初始化
            hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
            vnode.isAsyncPlaceholder = true;
        }
        return;
    }

    // 为静态树重用元素。
    // 注意，只有克隆 vnode 时，我们才会执行此操作-
    // 如果未克隆新节点，则表示渲染函数已通过热重载 api 重置，我们需要进行适当的重新渲染。
    if (
        isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
        // vnode 与 oldVnode 是否都是静态节点？若是，退出程序
        vnode.componentInstance = oldVnode.componentInstance;
        return;
    }

    let i;
    const data = vnode.data;
    if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
        i(oldVnode, vnode);
    }

    const oldCh = oldVnode.children; // 旧子节点
    const ch = vnode.children; // 新子节点

    // vnode 新节点；data 新节点数据
    if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
        if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
    }

    // prettier-ignore
    if (isUndef(vnode.text)) {
        // 没有 text，vnode 不是文本节点

        if (isDef(oldCh) && isDef(ch)) {
            // 判断：都是列表容器元素
            // 处理：updateChildren
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);

        } else if (isDef(ch)) {
            // 判断：oldCh 不是列表，ch 是列表
            // 处理：清空并插入列表
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);

        } else if (isDef(oldCh)) {
            // 判断：oldCh 是列表，ch 不是列表元素和文本元素
            // 处理：清空旧列表
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);

        } else if (isDef(oldVnode.text)) {
            // 判断：旧的是文本，新的啥也不是
            // 处理：旧的清除文本
            nodeOps.setTextContent(elm, "");
        }
    } else if (oldVnode.text !== vnode.text) {
        // 判断：新 vnode 是文本元素
        // 处理：将 旧的 设置成新文本
        nodeOps.setTextContent(elm, vnode.text);
    }

    // hook
    if (isDef(data)) {
        if (isDef((i = data.hook)) && isDef((i = i.postpatch))) {
            i(oldVnode, vnode);
        }
    }
}
```

### updateChildren

```js
// prettier-ignore
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    // 旧前 旧后
    let oldStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    // 新前 新后
    let newStartIdx = 0
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    // ---
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // 特殊标志，仅由＜transition group＞使用，以确保离开过渡期间移除的元件保持在正确的相对位置
    const canMove = !removeOnly
    
    // 开发模式
    if (process.env.NODE_ENV !== 'production') checkDuplicateKeys(newCh)
    
    // 安全区间内迭代
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

      // 双端比较--START

      if (isUndef(oldStartVnode)) {
        // 示例：old[ , , a, b]
        // 判断：有效查找旧前节点
        oldStartVnode = oldCh[++oldStartIdx] // Vnode 已向左移动 (has been moved left)
        
      } else if (isUndef(oldEndVnode)) {
        // 示例：old[ , , a, b, , ]
        // 判断：有效查找旧后节点
        oldEndVnode = oldCh[--oldEndIdx]

      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 示例：old[ a, b ]
        // 示例：new[ a, b ]
        // 判断：新旧前节点相同：patch 处理
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        // 处理：有效查找下一对新旧前节点
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]

      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 示例：old[ a, b ]
        // 示例：new[ a, b ]
        // 判断：新旧后节点相同，patch 处理
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        // 处理：有效查找下一对
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]

      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 示例：old[ a, b, c ]
        // 示例：new[ b, c, a ]
        // 判断：旧前和新后节点相同，
        // 处理：patchVnode
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        // 处理：移动位置
        // 移前：old[ a, b, c ]
        // 移后：old[ b, c, a ]
        canMove && nodeOps.insertBefore(
            parentElm, 
            oldStartVnode.elm, 
            nodeOps.nextSibling(oldEndVnode.elm)
        )
        // 处理：有效查找下一对
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]

      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 示例：old[ a, b, c ]
        // 示例：new[ c, a, b ]
        // 判断：旧前和新后节点相同，
        // 处理：patchVnode
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        // 处理：移动位置
        // 移前：old[ a, b, c ]
        // 移后：old[ c, a, b ]
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]

      } else {
        // 双端比较--END
        // ==========================================
        // ===> 双端匹配完后还有剩余的 复杂情况
        // ===> 示例1：old[ patched, b, e, f, patched ]
        // ===> 示例1：new[ patched, e, patched ]
        // ===> 
        // ===> 示例2：old[ patched, b, e, f, patched ]
        // ===> 示例2：new[ patched, e, h, l, m, patched ]
        // ===> 开始处理当前的 newStartVnode: e 
        // ==========================================

        if (isUndef(oldKeyToIdx)) {
            // 仅执行一次，剩余的旧子节点无 key 则生成 key
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        }

        // 为 newStartVnode 在 oldCh 找一个配对者
        idxInOld = 
            // 新子节点是否存在 key ？
            isDef(newStartVnode.key) 
            // 是，尝试取对应 key 的旧子节点
          ? oldKeyToIdx[newStartVnode.key]
            // 否，从【旧子节点区间列表】中查找和 new 相同的 old 的索引
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        
        if (isUndef(idxInOld)) {
            // 无解：newStartVnode 一定是新增节点
            // 处理：创建新增节点（含插入位置信息）
            createElm(
                newStartVnode, insertedVnodeQueue, parentElm, 
                oldStartVnode.elm, false, newCh, newStartIdx
            )
        } else {
          // 存在：newStartVnode 存在一个 oldChNode 配对

          // 处理：获取它
          vnodeToMove = oldCh[idxInOld]

          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 示例：old[ patched, b, vnodeToMove, f, patched ]
            // 示例：new[ patched, vnodeToMove, patched ]
            // 判断：两者相同
            // 处理：旧节点打补丁 patchVnode
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
            // 处理：旧节点剥离原位置
            // 示例：old[ patched, b, undefined, f, patched ] => vnodeToMove
            oldCh[idxInOld] = undefined
            // 处理：旧节点插入新位置 oldStartVnode 之前, 表示它已完成打补丁。
            // 移前：old[ patched, b, undefined, f, patched ] => vnodeToMove
            // 移后：old[ patched, vnodeToMove, b, undefined, f, patched ] <= vnodeToMove
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // 判断：相同的键但不同的元素，视为新元素
            // 处理：创建新增节点（含插入位置信息）
            createElm(
                newStartVnode, insertedVnodeQueue, parentElm, 
                oldStartVnode.elm, false, newCh, newStartIdx
            )
          }
        }
        // 处理：查询下一个新前节点（最终所有新节点全部比对并处理完成✅）
        newStartVnode = newCh[++newStartIdx]
      }
    }

    if (oldStartIdx > oldEndIdx) {
        // 示例：old[ a, b, c,]
        // 示例：new[ a, b, m, n, c ]
        // 如果 oldCh 比 newCh 先循环完毕，那么 newCh 里面剩余的节点都是需要新增的节点，
        // 把 [newStartIdx, newEndIdx] 之间的所有节点都插入到 DOM 中
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
        // 示例：old[ a, b, m, e, n, c] => old[ a, b, e, m, undefined n, c]
        // 示例：new[ a, b, e, c ]
        // 如果 newCh 比 oldCh 先循环完毕，那么 oldCh 里面剩余的节点都是需要删除的节点，
        // 把 [oldStartIdx, oldEndIdx] 之间的所有节点都删除
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```

## 总结

1.  比较：`新前 == 旧前` =》 `打补丁旧前`
1.  比较：`新后 == 旧后` =》 `打补丁旧后`
1.  比较：`新前 == 旧后` =》 `打补丁旧后`
1.  比较：`新后 == 旧前` =》 `打补丁旧前`
1.  比较：`新前 == 旧剩余` =》 `新增新前 || (打补丁旧剩余 && 旧剩余移动到到旧前的前面)`
1.  比较：`旧前 ?> 旧结束` =》 `新剩余全部新增(新多旧少) : 旧剩余全部删除(新少旧多)`

## 参考资料

-   [Vue 分析](https://github.com/ygs-code/vue/blob/master/vue.js)
-   [Vue 源码系列-Vue 中文社区](https://vue-js.com/learn-vue/)
