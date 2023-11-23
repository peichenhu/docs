<script setup lang="ts">
defineProps(['active', 'text']);
</script>

<template>
	<div class="btn" :class="{ active }">
		{{ text }}
	</div>
</template>

<style scoped lang="less">
.btn {
	flex: 0 0 auto;
	margin-bottom: 5px;
	width: max-content;
	padding: 0 10px;
	height: 30px;
	color: #fff;
	line-height: 26px;
	text-align: center;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	outline: none;
	border-radius: 5px;
	z-index: 0;
	background: #fff;
	border: 2px solid #57cc99;
	color: #57cc99;
	box-sizing: border-box;
}
.btn.active {
	background: #57cc99;
	color: #fff;
}
.btn:first-child {
	margin-left: 5px;
}
.btn + .btn {
	margin-left: 5px;
}
.btn:hover {
	color: #fff;
}
.btn:hover:after {
	width: 100%;
}
.btn:after {
	content: '';
	position: absolute;
	z-index: -1;
	transition: all 0.3s ease;
	left: 0;
	top: 0;
	width: 0;
	height: 100%;
	background: #57cc99;
}
</style>
