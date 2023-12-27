<template>
  <div class="p-5">
    <p class="text-sm text-gray-500 ">其他设置</p>
    <div class="flex py-5 border-b">
        手机号：{{ user.phone }}
        <n-button class="ml-auto" text type="primary" size="medium" @click="jump">修改</n-button>
    </div>
  </div>
</template>

<script setup>
import {NButton} from 'naive-ui'
useHead({title:"其他设置"}) 
const user = useUser()
const jump = () => {
    navigateTo("/bindphone")
}
</script>

<style>

</style>