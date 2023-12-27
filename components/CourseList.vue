<template>
  <n-card @click="open" footer-style="padding:0" class="cursor-pointer mb-5 shadow-md">
    <template #cover>
      <UiImage :src="item.cover" class="w-[100%] h-[150px]"></UiImage>
      <!-- <img :src="item.cover" class="w-[100%] h-[150px]" /> -->
    </template>
    <div class="pt-2">
      <span class="font-semibold w-full truncate">{{ item.title }}</span>
    </div>
    <div class="mt-2 flex items-end">
      <Price :value="item.price"></Price>
      <Price class="ml-2" :through="true" :value="item.t_price"></Price>
    </div>
    <template #footer v-if="item.group_id || item.flashsale_id">
        <div
          class="bg-yellow-500 text-white p-3 text-xs flex items-center rounded-b"
        >
          {{ item.group_id ? "拼团中" : "秒杀中" }}
          <div class="ml-auto flex items-center">
            <CountDown :time="item.end_time"></CountDown>
          </div>
        </div>
    </template>
  </n-card>
</template>

<script setup>
import { NCard } from "naive-ui";
const props = defineProps({
  item: Object,
});
const open = () => {
  navigateTo(`/detail/course/${props.item.id}`)
}
</script>

<style>
</style>