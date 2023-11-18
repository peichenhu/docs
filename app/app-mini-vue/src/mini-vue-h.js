// ==========================================
// ===> 渲染函数 hyperscript 或者 createVnode
// ==========================================
const h = function (tag, props, children) {
    return {
        tag,
        props,
        children,
    };
};

export default h;
