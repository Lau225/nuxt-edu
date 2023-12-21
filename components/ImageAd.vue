<template>
  <img v-for="item,index in data" :key="index" 
  :src="item.src" @click="$commonOpen(item)"
  class="w-[100%] h-[100px] rounded mb-6 cursor-pointer" alt="">
</template>

<script setup>
defineProps({
    data:Array
})
</script>

<style>

</style>