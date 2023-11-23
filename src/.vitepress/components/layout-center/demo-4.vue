<template>
	<div class="container">
		<div class="child">4</div>
	</div>
</template>

<style scoped lang="less">
.container {
	height: 50px;
	border: 1px solid red;
	display: flex;
	justify-content: center;
	align-items: center;
	.child {
		width: 20px;
		height: 20px;
		border: 1px solid blue;
		// align-self: center;
	}
}
</style>
