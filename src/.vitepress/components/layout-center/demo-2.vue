<template>
	<div class="container">
		<div class="child">2</div>
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
		margin: 0 auto;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
