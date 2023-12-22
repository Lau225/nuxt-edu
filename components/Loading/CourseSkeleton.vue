<template>
  <n-grid :x-gap="20" :cols="4">
    <n-grid-item v-for="i in 4" :key="i">
      <n-card class="mb-5 flex">
        <n-skeleton text style="width: 30%"></n-skeleton>
        <n-skeleton text :repeat="3"></n-skeleton>
        <n-skeleton text style="width: 60%"></n-skeleton>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
  
  <script setup>
import { NCard, NSkeleton, NGridItem, NGrid } from "naive-ui";
</script>
  
  <style>
</style>