<script setup lang="ts">
defineProps(['useBFC']);
</script>

<template>
	<div class="bfc" v-if="useBFC">
		<slot></slot>
	</div>
	<template v-else>
		<slot></slot>
	</template>
</template>

<style scoped lang="less">
.bfc {
	overflow: hidden;
	border: 1px dashed green;
}
</style>
