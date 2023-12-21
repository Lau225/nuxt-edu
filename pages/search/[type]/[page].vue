<template>
  <div>
    {{ $route.params.type }} {{ $route.params.page }}
  </div>
</template>

<script setup>
definePageMeta({
    middleware:["search"]
})
</script>

<style>

</style>