<script setup lang="ts">
import { ref, computed } from 'vue';

const screenWidth = ref(100);
const screenStyle = computed(() => {
	document.documentElement.style.setProperty('--screen-width', screenWidth.value + 'vw');
	return {
		width: screenWidth.value + '%'
	};
});
</script>

<template>
	<div class="screen">
		<div class="setting">
			<label class="title">尝试拖动改变模拟屏幕 (白色区域) 的 screenWidth: {{ screenWidth }}%</label>
			<input type="range" v-model="screenWidth" min="50" max="100" />
		</div>
		<div class="content">
			<div class="body" :style="screenStyle">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.screen {
	display: block;

	.setting {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		background: black;
		border: 1px solid gray;
		height: 40px;
		line-height: 40px;
		border-radius: 8px 8px 0 0;
		padding: 0 8px;
		color: white;
	}
	.content {
		border: 1px solid gray;
		background: black;
	}
	.body {
		background: white;
		min-height: 400px;
	}
}
</style>
