<template>
	<div class="container">
		<div class="child">7</div>
	</div>
</template>

<style scoped lang="less">
.container {
	text-align: center;
	width: 100%;
	height: 100px;
	border: 1px solid red;
	
	&:before {
		content: '';
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.child {
		width: 50px;
		height: 50px;
		border: 1px solid blue;
		vertical-align: middle;
		display: inline-block;
		text-align: initial;
	}
}
</style>
