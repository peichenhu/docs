<script setup lang="ts">
import { ref } from 'vue';
import Btn from './btn.vue';
import BFC from './bfc.vue';
const useBFC = ref(false);
</script>

<template>
	<div class="demo demo-1">
		<div class="btn-list">
			<span>请选择：</span>
			<Btn :active="useBFC" @click="useBFC = true" text="使用 BFC 包裹子元素二" />
			<Btn :active="!useBFC" @click="useBFC = false" text="不使用 BFC 包裹子元素二" />
		</div>

		<div class="parent">
			<p>父元素区域，外边距折叠仅与垂直方向有关</p>
			<p class="child" style="margin: 10px 0">子元素一 ：margin: 10px 0;</p>
			<BFC :useBFC="useBFC">
				<p class="child" style="margin: 10px 0">子元素二 ：margin: 10px 0;</p>
			</BFC>
			<p class="child" style="margin: 10px 0">子元素三 ：margin: 10px 0;</p>
		</div>
	</div>
</template>

<style scoped lang="less">
@import './common.less';
.parent {
	padding: 5px;
	border: 1px dashed red;
}
.child {
	padding: 5px;
	margin: 10px 0;
	border: 1px dashed blue;
}
</style>
