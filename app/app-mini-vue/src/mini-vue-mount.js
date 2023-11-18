const mount = function (vnode, container) {
    const { tag, props, children } = vnode;
    const el = (vnode.el = document.createElement(tag));
    if (typeof props === "object") {
        for (const key in props) {
            const value = props[key];
            if (key.startsWith("on")) {
                const fnName = key.slice(2).toLocaleLowerCase();
                el.addEventListener(fnName, value);
            } else {
                el.setAttribute(key, value);
            }
        }
        if (typeof children === "string") {
            el.textContent = children;
        } else {
            children.forEach((child) => {
                mount(child, el);
            });
        }
    }

    container && container.appendChild(vnode.el);

    return el;
};

export default mount;
