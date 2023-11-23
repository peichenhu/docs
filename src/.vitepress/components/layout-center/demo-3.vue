<template>
	<div class="container">
		<div class="child">3</div>
	</div>
</template>

<style scoped lang="less">
.container {
	position: relative;
	height: 50px;
	border: 1px solid red;
	.child {
		width: 20px;
		height: 20px;
		border: 1px solid blue;
		position: relative;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
