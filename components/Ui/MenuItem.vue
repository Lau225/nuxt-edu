<template>
    <div class="menu-item" :class="{ 'menu-item-active':active }">
          <slot/>
    </div>
</template>
<script setup>
const props = defineProps({
    active:{
        type:Boolean,
        default:false
    }
})


</script>
<style scoped>
.menu-item{
  cursor: pointer;
  transition: .2s;
  @apply px-2 py-1 mx-1 rounded hover:(bg-blue-50 text-blue-700)
  active:(!bg-blue-100);
}
.menu-item-active{
  @apply !bg-blue-100 !text-blue-600
}
</style>