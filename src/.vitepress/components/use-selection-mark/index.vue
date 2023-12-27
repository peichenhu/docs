<script lang="ts">
import { toValue, watch, defineComponent } from 'vue';
import { useSelectionMark } from './useSelectionMark';

export default defineComponent({
	setup() {
		const { store } = useSelectionMark({
			rootSelector: '.demo> .workspace'
		});

		watch(store, () => {
			console.log('useSelectionMark--store', toValue(store));
		});
	}
});
</script>

<template>
	<div class="demo">
		<div>
			非工作区（鼠标划词没有效果）： Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam quia
			maxime repellat labore omnis ea molestiae excepturi quod dicta porro debitis impedit consequatur similique,
			obcaecati esse eveniet facilis fuga!
		</div>
		<br />
		<div class="workspace">
			工作区（鼠标划词有效果）： Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam quia maxime
			repellat labore omnis ea molestiae excepturi quod dicta porro debitis impedit consequatur similique,
			obcaecati esse eveniet facilis fuga!
		</div>
	</div>
</template>

<style scoped lang="less">
.demo {
	display: block;
	> div {
		border: 1px dashed lightgray;
		padding: 7px;
		border-radius: 4px;
	}
}
</style>
