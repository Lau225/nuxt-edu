<template>
  <div>
    <n-grid :x-gap="20">
        <n-grid-item :span="18">
            <n-card>
                <template #header>
                    <h3 class="text-center font-bold">{{ data.title }}</h3>
                    <n-divider/>
                    <p class="space-x-5">
                        <span>题目总数：{{ testpaper_questions.length }}</span>
                        <span>总分数：{{ data.total_score }}</span>
                        <span>时间：{{ data.expire }}分钟</span>
                    </p>
                </template>
                <!-- 题目组件 -->
                <paper-test-item :id="'question_' + index" @change="handleUserValueChange(item,$event)" v-for="item,index in testpaper_questions" :key="index" :item="item" :index="index"/>
            </n-card>
        </n-grid-item>
        <n-grid-item :span="6">
            <n-card>
                <template #header>
                    <div class="flex flex-col items-center justify-center">
                        <small class="text-gray-500 mb-1">剩余时间</small>
                        <time-box :expire="data.expire" class="text-light-blue-500 text-3xl"/>
                    </div>
                </template>
                <n-grid :x-gap="12" :cols="4">
                    <n-grid-item v-for="item,index in testpaper_questions" :key="index">
                        <n-tag @click="scrollToDom(index)" class="mb-2 w-full cursor-pointer flex items-center justify-center" 
						:type="item.isTest ? 'success' : 'default'">
                            {{ index + 1 }}
                        </n-tag>
                    </n-grid-item>
                </n-grid>
                <n-divider/>
                <div>
                    <n-button type="primary" class="w-full">交卷</n-button> 
                </div>
            </n-card>
        </n-grid-item>
    </n-grid>
    
  </div>
</template>

<script setup>
import {NDivider,NGrid,NGridItem,NCard,NTag,NButton} from "naive-ui"
import PaperTestItem from "~/components/PaperTestItem.vue"
const data = ref({
		"id": 12,
		"title": "测试试卷111",
		"total_score": 100,
		"pass_score": 60,
		"expire": 60,
		"testpaper_questions": [
			{
				"id": 42,
				"score": 25,
				"question_id": 73,
				"title": "说说你的看法",
				"remark": "问题解析",
				"type": "answer",
				"user_value": [
					""
				]
			},
			{
				"id": 43,
				"score": 25,
				"question_id": 72,
				"title": "请问我年龄多大",
				"remark": "问题解析",
				"type": "completion",
				"user_value": [
					""
				]
			},
			{
				"id": 44,
				"score": 0,
				"question_id": 71,
				"title": "请问我是男生还是女生",
				"remark": "问题解析",
				"type": "trueOrfalse",
				"options": [
					"正确",
					"错误"
				],
				"user_value": -1
			},
			{
				"id": 45,
				"score": 25,
				"question_id": 70,
				"title": "你的名字叫什么",
				"remark": "问题解析",
				"type": "checkbox",
				"options": [
					"张三",
					"李四",
					"王五",
					"王五哈"
				],
				"user_value": []
			},
			{
				"id": 46,
				"score": 25,
				"question_id": 65,
				"title": "你的名字叫什么",
				"remark": "问题解析",
				"type": "checkbox",
				"options": [
					"张三",
					"李四",
					"王五",
					"王五哈"
				],
				"user_value": []
			}
		],
		"user_test_id": 7
})
const testpaper_questions = computed(()=>{
	return data.value ? data.value.testpaper_questions.map(o=>{
		o.isTest = false
		return o
	}) : []
})
useHead({title:"考试页面"})

// 检查题目是否填写
const updateIsTest = () => {
	testpaper_questions.value.forEach(item=>{
		let t = false
		// 问答题和填空题
		if(item.type === 'answer' || item.type === 'completion'){
			t = !!item.user_value[0]
		}else if(item.type === 'radio' || item.type === 'trueOrfalse'){
			t = item.user_value !== -1
		}else{
			t = item.user_value.length > 0
		}
		item.isTest = t
	})
}

// 监听题目值的变化
const handleUserValueChange = (item,val) => {
	item.user_value = val
	updateIsTest()
}

// 自动跳转指定题目
const scrollToDom = (index) => {
	const dom = document.getElementById("question_" + index)
	window.scroll(0,dom.offsetTop)
}
</script>

<style>

</style>