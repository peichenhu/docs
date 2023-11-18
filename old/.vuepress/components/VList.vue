<template>
    <div class="v-list"> </div>
</template>

<script>
/**
 * 虚拟列表
 * 上预留 N 个位置(理想状态)
 * 中放置 N 个项目(理想状态)
 * 下预留 N 个位置(理想状态)
 *
 * 初始：
 * 上面 0 个预留
 * 下面 2N 个预留
 *
 * 向下滚动 (并且没有到底部)：可填充大于 N 个（此时 上面 1N 下面 1N）
 * diff 上面超出 N 的 X 个，下面补充 X 个，上面删除 X 个
 *
 * 向上滚动 (并且没有到顶部)：可填充小于 N 个（此时 上面 1N 下面 1N）
 * diff 上面不足 N 的 X 个， 上面补充 N-X, 下面删除 N-X
 */
export default {
    mounted() {
        this.$nextTick(() => {
            this.initVList();
        });
    },
    methods: {
        initVList() {
            var visibleItemCount = 10;
            var vList = {
                length: 300,
                list: new Array(300).fill(1).map((x, i) => i), // 总数据
                container: document.querySelector(".v-list"), // 容器
                containerHeight: visibleItemCount * 30, // 数据项宽度 * 容器包含可见数据项数量 = 容器高度
                itemCountOfContainer: visibleItemCount * 3, // 容器包含的数据项数量 N+N+N === 40
                itemCountOfScreen: visibleItemCount, // 容器包含可见数据项数量 N === 20
                itemWidth: "100%", // 数据项宽度
                itemHeight: 30, // 数据项高度
                cachesElements: [],
                oldScrollTop: 0 //偏移量
            };
            vList.init = function () {
                vList.initScrollEvent();
                let list = vList.list.slice(0, vList.itemCountOfContainer);
                let tmp = null;
                vList.container.style.height = vList.containerHeight + "px";
                vList.container.style.overflow = "auto";
                list.forEach((item, index) => {
                    tmp = vList.createItem(item, index);
                    vList.container.appendChild(tmp);
                });
            };
            vList.initScrollEvent = function () {
                vList.container.addEventListener("scroll", function (e) {
                    const slice = (...args) => Array.prototype.slice.call(...args);
                    const scrollTop = vList.container.scrollTop;
                    const isDown = scrollTop - vList.oldScrollTop > 0;
                    // 顶部偏移量可填充项目数
                    const topCanAddCount = Math.floor(scrollTop / vList.itemHeight);
                    if (isDown) {
                        // 向下滚动 (并且没有到底部)：可填充大于 N 个（此时 上面 1N 下面 1N）
                        const lastChildIndex = +vList.container.lastChild.dataset.index;
                        if (topCanAddCount > vList.itemCountOfScreen && lastChildIndex < vList.length - 1) {
                            // diff 上面超出 N 的 diffCoun 个，下面补充 diffCoun 个，上面删除 diffCoun 个
                            const diffCoun = topCanAddCount - vList.itemCountOfScreen;
                            if (diffCoun < 3) return;
                            const list = slice(vList.container.children, 0, diffCoun);
                            list.forEach((item) => {
                                // 删除一个头部
                                vList.container.removeChild(item);
                                // 缓存优化
                                vList.cachesElements.push(item); // 优化
                                // 新增一个尾部
                                const lastChildIndex = +vList.container.lastChild.dataset.index;
                                if (lastChildIndex < vList.length - 1) {
                                    const newItemValue = vList.list[lastChildIndex + 1];
                                    const newItemElement = vList.createItem(newItemValue, lastChildIndex + 1);
                                    vList.container.appendChild(newItemElement);
                                }
                            });
                        }
                    }
                    if (!isDown) {
                        // 向上滚动(并且没有到顶部)：可填充小于 N （此时 上面 N 个，下面 N 个）
                        const firstChildIndex = +vList.container.children[0].dataset.index;
                        if (topCanAddCount < vList.itemCountOfScreen && firstChildIndex > 0) {
                            // diff 上面补充 N-X, 下面删除 N-X
                            const diffCoun = vList.itemCountOfScreen - topCanAddCount;
                            if (diffCoun < 3) return;
                            const deleteStart = vList.container.children.length - diffCoun;
                            const deleteEnded = vList.container.children.length;
                            const list = slice(vList.container.children, deleteStart, deleteEnded);
                            list.forEach((item) => {
                                // 删除一个尾部
                                vList.container.removeChild(item);
                                // 缓存优化
                                vList.cachesElements.push(item); // 优化
                                // 新增一个头部
                                const firstChildIndex = +vList.container.children[0].dataset.index;
                                if (firstChildIndex > 0) {
                                    const newItemValue = vList.list[firstChildIndex - 1];
                                    const newItemElement = vList.createItem(newItemValue, firstChildIndex - 1);
                                    vList.container.insertBefore(newItemElement, vList.container.children[0]);
                                }
                            });
                        }
                    }
                    vList.oldScrollTop = scrollTop;
                });
            };
            vList.createItem = function (content, index) {
                let item = vList.cachesElements.pop() || document.createElement("div");
                item.innerHTML = content;
                item.className = "item";
                item.style.boxSizing = "border-box";
                item.style.width = isNaN(+vList.itemWidth) ? vList.itemWidth : vList.itemWidth + "px";
                item.style.height = isNaN(+vList.itemHeight) ? vList.itemHeight : vList.itemHeight + "px";
                item.style.border = "1px solid rgba(0,0,0,0.3)";
                item.style.background = index % 2 == 0 ? "rgba(255,0,0,0.3)" : "rgba(0,255,0,0.3)";
                item.dataset.index = index;
                return item;
            };

            vList.init();
        }
    }
};
</script>

<style></style>
