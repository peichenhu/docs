<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { useHightlight } from './use-hightlight';
const content = ref(
	`<span>指</span>
<span>控</span>
<div> <span>指</span><span>控</span> </div>
<div> <span style="display: none">指</span><span>控</span>告</div>
<div>hello <span>L</span>or<span>e</span>m</div>
<div><span style="display: none">L</span>orem--Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
<div>我向他们发誓。他从未收到任何指控，也没有收到任何指控。</div>
`
);

const keyword = reactive({
	name: 'use-hightlight-demo-3',
	bgColor: '#1781b5',
	color: '#ffffff',
	list: ['Lorem', '指控']
});

const options = [
	{
		value: 'Lorem',
		label: 'Lorem'
	},
	{
		value: '指控',
		label: '指控'
	}
];

const { reload } = useHightlight('.case-3', [keyword]);

watch(keyword, () => reload(), { deep: true });
</script>

<template>
	<div class="use-hightlight">
		<el-form label-width="120px" class="keyword-form">
			<el-form-item label="文本字体颜色" prop="pass">
				<el-color-picker v-model="keyword.color" />
			</el-form-item>
			<el-form-item label="文本背景颜色" prop="checkPass">
				<el-color-picker v-model="keyword.bgColor" />
			</el-form-item>
			<el-form-item label="文本词组列表：" prop="age">
				<el-select
					v-model="keyword.list"
					multiple
					filterable
					allow-create
					default-first-option
					:reserve-keyword="false"
					placeholder="Choose tags for your article"
				>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>

			<el-form-item label="动态HTML片段" prop="checkPass">
				<el-input v-model="content" autosize type="textarea" placeholder="动态文本片段" />
			</el-form-item>
		</el-form>
		<div class="case-3">
			<div class="case" v-html="content"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.use-hightlight {
	display: block;
	.keyword-form {
		background: #efefef;
		padding: 8px;
		border-radius: 4px;
		margin-bottom: 12px;
	}
}
</style>
