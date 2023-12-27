<template>
  <section class="bg-white shadow rounded my-5">
    <div class="p-3 border-b">
        <h4>精品推荐</h4>
    </div>
    <div class="p-3">
        <course-list v-for="item,index in data" :key="index" :item="item"/>
    </div>
  </section>
</template>

<script setup>
    const {data} = await useHotCourseListApi()
</script>

<style>

</style>