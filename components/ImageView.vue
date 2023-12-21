<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi v-for="(item, i) in data" :key="i">
      <n-card class="cursor-pointer" @click="$commonOpen(item)">
        <template #cover>
            <img :src="item.src" class="w-[100] h-[90px] ">
        </template>
        <div class="text-center pt-4">
            {{ item.name }}
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGi, NGrid,NCard } from "naive-ui";
defineProps({
  data: Array,
});
</script>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
</style>