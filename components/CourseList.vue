<template>
  <n-card footer-style="padding:0" class="cursor-pointer mb-5 shadow-md">
        <template #cover>
            <img :src="item.cover" class="w-[100%] h-[150px] ">
        </template>
        <div class="pt-2">
            <span class=" font-semibold w-full truncate">{{ item.title }}</span>
        </div>
        <div class="mt-2 flex items-end">
            <Price :value="item.price"></Price>
            <Price class="ml-2" through="true" :value="item.t_price"></Price>
        </div>
        <template #footer>
            <div class="bg-yellow-500 text-white p-3 text-xs flex items-center
            rounded-b">
                拼团中
                <div class="ml-auto flex items-center">
                    倒计时
                </div>
            </div>
        </template>
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