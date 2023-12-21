<template>
  <n-carousel show-arrow autoplay class="mb-6">
    <img v-for="item,index in data" :key="index"
      class="carousel-img" :src="item.src"
      @click="$commonOpen(item)"
    >
  </n-carousel>
</template>

<script setup>
import {NCarousel} from 'naive-ui'
defineProps({
    data:Array
})

</script>

<style>
.carousel-img {
  cursor: pointer;
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>