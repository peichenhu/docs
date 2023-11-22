<script setup lang="ts">
import { ref } from 'vue';
import Select from './select.vue';
const bfcStyle = ref('NoBFC');
</script>

<template>
	<div class="demo demo-1">
		<Select v-model:bfcStyle="bfcStyle" />
		<div class="parent" :class="{ bfc: bfcStyle !== 'NoBFC' }" :style="bfcStyle">
			<p>父元素空间: {{ bfcStyle }}</p>
			<div class="child fr">
				<p>子元素: float: left;</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
@import './common.less';
.parent.bfc {
	border: 1px dashed green;
}
.parent {
	border: 1px dashed red;
	padding: 5px;
}
.child {
	padding: 5px;
	display: inline-block;
	width: fit-content;
	height: fit-content;
	line-height: 1.5;
	border: 1px dashed blue;
}
</style>
