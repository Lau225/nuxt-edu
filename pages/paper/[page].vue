<template>
  <div>
    考试列表{{ $route.params.page }}
    <n-button type="primary" size="medium" @click="test">测试权限</n-button>
    
  </div>
</template>

<script setup>
import {NButton} from 'naive-ui'
useHead({
        title:'考试列表',
        meta:[
        {name:"description",content:"考试描述"},
        {name:"keywords",content:"考试关键词"}
      ],
})

const test = () => {
  useHeadAuth(()=>{
    console.log("已经登陆并且绑定手机号了");
  })
}
</script>

<style>

</style>