<script setup lang="ts">
// import { ref, reactive } from 'vue';
// defineProps([]);
</script>

<template>
	<div class="demo-1">
		<div>
			<dl>
				<dt>A</dt>
				<dd>Andrew W.K.</dd>
				<dd>Apparat</dd>
				<dd>Arcade Fire</dd>
				<dd>At The Drive-In</dd>
				<dd>Aziz Ansari</dd>
			</dl>
			<dl>
				<dt>C</dt>
				<dd>Chromeo</dd>
				<dd>Common</dd>
				<dd>Converge</dd>
				<dd>Crystal Castles</dd>
				<dd>Cursive</dd>
			</dl>
			<dl>
				<dt>E</dt>
				<dd>Explosions In The Sky</dd>
			</dl>
			<dl>
				<dt>T</dt>
				<dd>Ted Leo & The Pharmacists</dd>
				<dd>T-Pain</dd>
				<dd>Thrice</dd>
				<dd>TV On The Radio</dd>
				<dd>Two Gallants</dd>
			</dl>
		</div>
	</div>
</template>

<style scoped lang="less">
.demo-1 {
	height: 200px;
	overflow: auto;
	
	* {
		box-sizing: border-box;
	}

	dl {
		margin: 0;
		padding: 24px 0 0 0;
	}

	dt {
		background: #b8c1c8;
		border-bottom: 1px solid #989ea4;
		border-top: 1px solid #717d85;
		color: #fff;
		font: bold 18px/21px Helvetica, Arial, sans-serif;
		margin: 0;
		padding: 2px 0 0 12px;
		position: -webkit-sticky;
		position: sticky;
		top: -1px;
	}

	dd {
		font: bold 20px/45px Helvetica, Arial, sans-serif;
		margin: 0;
		padding: 0 0 0 12px;
		white-space: nowrap;
	}

	dd + dd {
		border-top: 1px solid #ccc;
	}
}
</style>
