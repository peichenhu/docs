import mount from "./mini-vue-mount.js";

// ==========================================
// ===> DOM DIFF
// ==========================================
const diffProps = function (oldVnode, newVnode, el) {
    const oldProps = oldVnode.props || {};
    const newProps = newVnode.props || {};

    // 更新 prop
    for (const key in newProps) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];
        if (oldValue !== newValue) {
            if (key.startsWith("on")) {
                const fnName = key.slice(2).toLocaleLowerCase();
                oldValue && el.removeEventListener(fnName, oldValue);
                el.addEventListener(fnName, newValue);
            } else {
                el.setAttribute(key, newValue);
            }
        }
    }

    // 删除 prop
    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            el.removeAttribute(key);
        }
    }
};

const diffChildren = function (oldVnode, newVnode, el) {
    if (typeof newVnode.children === "string") {
        if (typeof oldVnode.children === "string") {
            if (newVnode.children !== oldVnode.children) {
                // string string
                el.textContent = newVnode.children;
            }
        } else {
            // children string
            el.textContent = newVnode.children;
        }
    } else {
        if (typeof oldVnode.children === "string") {
            // string children
            el.innerHTML = null;
            newVnode.children.forEach((child) => {
                el.appendChild(child.el);
            });
        } else {
            // children children
            const oldChildren = oldVnode.children || [];
            const newChildren = newVnode.children || [];
            const minLen = Math.min(oldChildren.length, newChildren.length);
            // 交集处理
            for (let i = 0; i < minLen; i++) {
                patch(oldChildren[i], newChildren[i], el);
            }
            if (newChildren.length > oldChildren.length) {
                // 新增员工处理
                newChildren.slice(oldChildren.length).forEach((child) => {
                    mount(child, el);
                });
            } else {
                // 新减员工处理
                oldChildren.slice(newChildren.length).forEach((child) => {
                    el.removeChild(child.el);
                });
            }
        }
    }
};

const patch = function (oldVnode, newVnode, parentEle) {
    if (oldVnode.tag === newVnode.tag) {
        const el = (newVnode.el = oldVnode.el);
        diffProps(oldVnode, newVnode, el);
        diffChildren(oldVnode, newVnode, el);
    } else {
        parentEle.replaceChild(mount(newVnode), oldVnode.el);
    }
};

export default patch;
