<script setup lang="ts">
import { Fragment } from 'vue';
defineProps(['useBFC']);
</script>

<template>
	<!-- <Fragment> -->
	<div class="bfc" v-if="useBFC">
		<slot></slot>
	</div>
	<template v-else>
		<slot></slot>
	</template>
	<!-- </Fragment> -->
</template>

<style scoped lang="less">
.bfc {
	overflow: hidden;
	border: 1px dashed green;
}
</style>
