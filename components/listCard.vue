<template>
  <div>
    <div class="flex mb-3">
      <span class="text-lg">{{ title }}</span>
      <n-button text class="ml-auto">查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4">
      <n-gi v-for="(item, i) in pdata" :key="i">
        <CourseList :item="item"></CourseList>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NButton, NGi, NGrid, NCard } from "naive-ui";
const props = defineProps({
  title:String,
  data:Array,
  type:{
    type:String,
    default:"course"
  }
})
const pdata = ref(props.data || [])
if(props.type === 'group'){
  const {data} = await useGroupDataApi({
    page:1,
    usable:1,
    limit:2
  })
  pdata.value = data.value?.rows || []
}
</script>

<style>
</style>