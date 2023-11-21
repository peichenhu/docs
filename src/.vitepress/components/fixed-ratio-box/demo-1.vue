<script setup lang="ts">
import Screen from '../screen/screen.vue';
</script>

<template>
	<Screen>
		<div class="container">
			<div class="content">
				<!-- 这里放入你的内容 -->
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, voluptatum ratione dicta minus sunt itaque quo debitis aperiam excepturi possimus dolor dignissimos
				totam suscipit culpa sapiente repudiandae architecto distinctio veritatis.
			</div>
		</div>
	</Screen>
</template>

<style scoped lang="less">
@import '../common.less';
.container {
	position: relative;
	width: 50%;
	padding-top: 50%; /* 设置高度为宽度的百分之 50, 根据需要进行调整 */
	border: 1px dashed red; // 可视化等比例盒子
}
.content {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.mixin-line-clamp(5);
}
</style>
