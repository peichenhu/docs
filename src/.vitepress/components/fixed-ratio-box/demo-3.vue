<script setup lang="ts">
import Screen from '../screen/screen.vue';
</script>

<template>
	<Screen>
		<div class="container">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4AWMYOAAAAAEAAHiy+3DAAAAAElFTkSuQmCC" class="placeholder" />
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
	border: 1px dashed red; // 可视化等比例盒子
	width: 50%;
	> .placeholder {
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
	}
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
