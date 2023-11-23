<script setup lang="ts">
import { ref } from 'vue';
import Btn from '../btn/btn.vue';
import Screen from '../screen/screen.vue';

const useBFC = ref(false);
</script>

<template>
	<div class="demo demo-3">
		<div class="btn-list">
			<span>请选择：</span>
			<Btn :active="useBFC" @click="useBFC = true" text="设置文本元素为 BFC 容器" />
			<Btn :active="!useBFC" @click="useBFC = false" text="不设置文本元素为 BFC 容器" />
		</div>
		<Screen class="parent" :min-height="120">
			<div class="child fl">子元素 ：float: left;</div>
			<div class="child" :class="{ bfc: useBFC }">
				这是一个浮动元素后面的文本内容（有斑马线背景）。在没有创建BFC的情况下，这段文本可能会被浮动元素覆盖。<br />
				这是一个浮动元素后面的文本内容（有斑马线背景）。在没有创建BFC的情况下，这段文本可能会被浮动元素覆盖。
			</div>
		</Screen>
	</div>
</template>

<style scoped lang="less">
@import './common.less';
.child.bfc {
	overflow: hidden;
	border: 0 solid green;
	border-width: 0 1px 1px;
	box-shadow: inset 0px 1px 0 0 green;
}
.parent {
	display: block;
	color: black;
}
.child {
	border: 1px dashed blue;
}
.child:not(:first-child) {
	background-image: repeating-linear-gradient(rgba(0, 0, 0, 0.1) 0 2px, transparent 0 6px);
}
</style>
