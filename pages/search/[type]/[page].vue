<template>
  <div>
    <h5 class=" text-lg md-3">
        "{{ title }}"的搜索和结果
    </h5>
    <UiTab>
        <UiTabItem @click="hanleClick(item.value)" :active="item.value === type" v-for="item,index in tabs" :key="index">
            {{ item.label }}
        </UiTabItem>
    </UiTab>
  </div>
</template>

<script setup>
const route = useRoute()
const title = route.query.keyword
useHead(title)
const tabs = [
    {
        label:"课程",
        value:"course"
    },
    {
        label:"专栏",
        value:"column"
    }
]
const type = ref(route.params.type)
const hanleClick = (t) => {
    navigateTo({
        params:{
            ...route.params,
            type:t
        },
        query:{
            ...route.query
        }
    })
}
definePageMeta({
    middleware:["search"]
})
</script>

<style>

</style>