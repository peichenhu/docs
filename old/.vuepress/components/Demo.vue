<template>
    <div class="demo">
        <div class="box">
            <div class="face f6"></div>
            <div class="face f5">$</div>
            <div class="face f4"> </div>
            <div class="facebar"></div>
            <div class="face f3"> </div>
            <div class="face f2">$</div>
            <div class="face f1"> </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {}
};
</script>

<style>
/* // @a: #ffdb03;
// @b: #f4af02;
// @c: #f0f921; */
.demo {
    height: 200px;
    background: rgba(0, 0, 0, 0.1);
    position: relative;
}
@keyframes roto {
    0% {
        transform: rotateY(0deg) scale(0.7);
    }
    20% {
        transform: rotateY(70deg) scale(0.9);
    }
    80% {
        transform: rotateY(110deg) scale(0.9);
    }
    100% {
        transform: rotateY(180deg) scale(0.7);
    }
}
.box {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    transform-style: preserve-3d;
    /* transform: rotateY(180deg); */
    animation: roto 5000ms linear infinite;
}
.face {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform-style: preserve-3d;
    /* overflow: hidden; */
}

.f6 {
    box-sizing: border-box;
    background: transparent;
    transform: translateZ(-7px) rotateY(180deg);
    border: 30px solid #ffdb03;
}

.f5 {
    box-sizing: border-box;
    font-size: 100px;
    color: #ffdb03;
    text-align: center;
    line-height: 140px;
    background: #f4af02;
    text-shadow: 1px 1px 3px #cf9502;
    border: 31px solid #cf9502;
    transform: translateZ(-6.5px) rotateY(180deg);
}

.f4 {
    line-height: 200px;
    background: #f4af02;
    transform: translateZ(-6px);
}
.facebar {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5.5px;
    margin-top: -100px;
    width: 11px;
    height: 200px;
    background: #f4af02;
    backface-visibility: visible;
    transform: rotateY(90deg);
}

.f3 {
    line-height: 200px;
    background: #f4af02;
    transform: translateZ(6px) rotateY(180deg);
}
.f2 {
    box-sizing: border-box;
    font-size: 100px;
    color: #ffdb03;
    text-shadow: 1px 1px 3px #cf9502;
    text-align: center;
    line-height: 140px;
    background: #f4af02;
    border: 31px solid #cf9502;
    transform: translateZ(6.5px);
}
.f1 {
    box-sizing: border-box;
    background: transparent;
    transform: translateZ(7px);
    border: 30px solid #ffdb03;
}
</style>
