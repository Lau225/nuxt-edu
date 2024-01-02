<template>
  <n-alert :type="status ==='ing' ?'success' : 'default'" :show-icon="false">
    <p class="text-xs text-gray-500">直播时间:{{ start }} ~ {{ end }}</p>
  </n-alert>
  
</template>

<script setup>
import {NAlert} from 'naive-ui'
const props = defineProps(["start","end"])

const status = computed(()=>{
    let {start,end} = props
    let status = useTimeStatus(start,end)
    console.log(status);
    return status
})
</script>

<style>

</style>