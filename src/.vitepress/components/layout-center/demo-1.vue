<template>
	<div class="container">
		<div class="child">1</div>
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
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
}
</style>
