<template>
  <div>
    考试列表{{ $route.params.page }}
  </div>
</template>

<script setup>
useHead({
        title:'考试列表',
        meta:[
        {name:"description",content:"考试描述"},
        {name:"keywords",content:"考试关键词"}
      ],
})
</script>

<style>

</style>