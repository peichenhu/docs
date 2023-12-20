<script setup lang="ts">
import { dataList } from './data';
import { usevScrollY, useVirtualList } from './use';
console.log(dataList);

const { scroll, vScrollY } = usevScrollY();
const { vObserver, vList } = useVirtualList(dataList, scroll);
</script>

<template>
	<div class="v-list">
		<title>VList</title>
		<div class="scroll-wrap" v-scroll-y>
			<template v-for="item in vList" :key="item.id">
				<div v-observer class="module" :style="{ height: item.height + 'px' }" :data-index="item.id">
					index:{{ item.id }}--height: {{ item.height }}
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="less">
.v-list {
	display: block;
	width: 100%;
	.scroll-wrap {
		position: relative;
		border: 1px dashed blue;
		height: 500px;
		overflow: hidden auto;
		padding: 1em;
		scroll-behavior: smooth;
		// -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
		-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
	}
	.module {
		border: 1px dashed red;
		border-width: 1px 1px 0 1px;
		&:last-child {
			border-width: 1px;
		}
	}
}
</style>
