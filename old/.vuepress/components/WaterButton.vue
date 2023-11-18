<template>
    <div class="my-module">
        <span class="btnWater btn">水波纹按钮2</span>
        <span class="btn">普通按钮3</span>
    </div>
</template>

<script>
    export default {
        props: {},
        mounted() {
            var className = "btnWater";
            document.addEventListener("mouseup", function (e) {
                console.log("WaterButton");
                // 消除默认事件
                e.preventDefault();
                // 指定样式类，自动注册事件
                let loop = (el) => {
                    if (el.className && el.className.split(" ").indexOf(className) !== -1)
                        return el;
                    else if (el.parentNode) return loop(el.parentNode);
                    else return null;
                };
                // 查找绑定元素
                let btnWater = loop(e.target);
                // 动态DOM,生成效果
                if (btnWater) {
                    const _offset = btnWater.getBoundingClientRect();
                    const [ left, top ] = [ e.clientX - _offset.left, e.clientY - _offset.top ];
                    const el = document.createElement("i");
                    el.setAttribute("style", `
                        top:${ top }px;
                        left:${ left }px;
                        pointer-events: none;
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        border-radius: 50%;
                        animation: water 900ms linear;
                    `);
                    btnWater.appendChild(el);
                    setTimeout(() => btnWater.removeChild(el), 1200);
                }
            });
        }

    };
</script>
<style>
    .btn {
        border-radius: 3px;
        display: inline-block;
        padding: 10px 50px;
        color: white;
        background: blue;
        margin: 1em;
        text-align: center;
        line-height: 50px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
    }
    
    @keyframes water {
        from {
            transform: scale(5);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
        }
        to {
            transform: scale(50);
            border-radius: 20%;
            background: rgba(255, 255, 255, 0);
        }
    }
</style>