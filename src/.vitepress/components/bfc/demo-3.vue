<script setup lang="ts">
import { ref } from 'vue';
import Btn from './btn.vue';
const useBFC = ref(false);
</script>

<template>
	<div class="demo demo-3">
		<div class="btn-list">
			<span>请选择：</span>
			<Btn :active="useBFC" @click="useBFC = true" text="设置父元素为 BFC 容器" />
			<Btn :active="!useBFC" @click="useBFC = false" text="不设置父元素为 BFC 容器" />
		</div>

		<div class="test">参照元素：height: 30px;</div>

		<div class="parent" :class="{ bfc: useBFC }">
			<p class="child">子元素 ：margin-top: 30px;</p>
			<p>父元素 ： margin-top: 10px;</p>
			<p>父元素 ： {{ useBFC ? '是' : '不是' }} BFC</p>
		</div>
	</div>
</template>

<style scoped lang="less">
@import './common.less';
.parent.bfc {
	overflow: hidden;
	border: 0 solid green;
	border-width: 0 1px 1px;
	box-shadow: inset 0px 1px 0 0 green;
}
.test {
	height: 30px;
	border: 1px solid yellow;
}
.parent {
	display: block;
	margin-top: 10px;
	padding: 0;
	border: 0 solid red;
	border-width: 0 1px 1px;
	box-shadow: inset 0px 1px 0 0 red;
}
.child {
	margin-top: 30px !important;
	border: 1px dashed blue;
}
</style>
