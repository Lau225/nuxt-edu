<template>
  <n-card class="cursor-pointer mb-5 shadow-md">
        <template #cover>
            <img :src="item.cover" class="w-[100%] h-[150px] ">
        </template>
        <div class="pt-2">
            <span class=" font-semibold w-full truncate">{{ item.title }}</span>
        </div>
        <div class="mt-2 flex">

        </div>
      </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui';
defineProps({
    item:Object
})
</script>

<style>

</style>