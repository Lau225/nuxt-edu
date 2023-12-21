<template>
  <div>
    <div class="flex mb-3">
      <span class="text-lg">{{ title }}</span>
      <n-button text class="ml-auto" quaternary>查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4">
      <n-gi v-for="(item, i) in data" :key="i">
        <CourseList :item="item"></CourseList>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NButton, NGi, NGrid, NCard } from "naive-ui";
defineProps({
  title:String,
  data:Array
})
</script>

<style>
</style>