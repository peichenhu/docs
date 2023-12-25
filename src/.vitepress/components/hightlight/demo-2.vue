<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { useHightlight } from './use-hightlight';
const content = ref(
	`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae pariatur soluta ducimus nisi vitae! Ipsam eos
ipsa commodi suscipit numquam accusantium, nostrum eaque. Ipsam dolores quis ea blanditiis quisquam
suscipit. 他会被认为是乐于助人的。谁天生孤独却又是生命！我向他们发誓。
他从未收到任何指控，也没有收到任何指控。我会为你感到高兴和高兴。 他承认了。`
);

const keyword = reactive({
	name: 'use-hightlight-demo-2',
	bgColor: '#dc9123',
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

const { reload } = useHightlight('.case-2', [keyword]);

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

			<el-form-item label="动态文本片段" prop="checkPass">
				<el-input v-model="content" autosize type="textarea" placeholder="动态文本片段" />
			</el-form-item>
		</el-form>
		<div class="case-2">
			<div class="case">{{ content }}</div>
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
