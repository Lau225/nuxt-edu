<template>
  <div>
    <template v-if="loading">
        <slot name="loading">
          <loading-skeleton></loading-skeleton>
        </slot>
    </template>
    <template v-else-if="error">
      <n-result status="500" title="错误提示" :description="error.message">
        <template #footer>
          <n-button @click="$route.go(-1)">回到首页</n-button>
        </template>
      </n-result>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import {NResult,NButton} from 'naive-ui'
const props = defineProps({
    pending: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Boolean, Symbol],
    default: "",
  },
});

const loading = ref(false)
const stop = watchEffect(()=>{
    if(props.pending && !loading.value){
        loading.value = true
    }else{
        setTimeout(()=>{
            loading.value = false
        },200)
    }
})
onBeforeUnmount(()=>stop())
</script>

<style>
</style>