<template>
	<div class="table">
		<div class="table-cell">
			<div class="child">5</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.table {
	width: 100%;
	height: 50px;
	border: 1px solid red;
	display: table;
	.table-cell {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	.child {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid blue;
	}
}
</style>
