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

<style>
:root {
	--screen-width: 100vw;
}
</style>

<style scoped lang="less">
@import '../common.less';
.container {
	position: relative;
	width: calc(var(--screen-width) * 0.2);
	height: calc(var(--screen-width) * 0.2);
	max-width: 500px;
	max-height: 500px;
	border: 1px dashed red;
}

.content {
	.mixin-line-clamp(5);
}
</style>
