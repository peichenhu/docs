<script setup lang="ts">
import { computed } from 'vue';
import Btn from '../btn/btn.vue';

const props = defineProps(['bfcStyle']);
const emit = defineEmits(['update:bfcStyle']);
const bfcStyle2 = computed({
	get() {
		return props.bfcStyle;
	},
	set(value) {
		emit('update:bfcStyle', value);
	}
});
const options = [
	// 触发 BFC
	'NoBFC',
	'float: left;',
	'float: right;',
	'overflow: hidden;',
	'overflow: auto;',
	'overflow: scroll;'
];
</script>

<template>
	<div class="select">
		<div class="tip">请选择：</div>
		<div class="btn-list">
			<Btn v-for="item in options" :active="bfcStyle2 === item" @click="bfcStyle2 = item" :text="item" />
		</div>
	</div>
</template>

<style scoped lang="less">
.select {
	display: flex;
	flex-flow: row nowrap;
	width: 100%;
	margin: 5px 0;
	.tip {
		flex: 0 0 auto;
		line-height: 30px;
	}
}
</style>
