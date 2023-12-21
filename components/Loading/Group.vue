
import type { setup } from '@css-render/vue3-ssr';
<template>
  <div>
    <template v-if="pending"> 加载中... </template>
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
defineProps({
  pedding: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Boolean, Symbol],
    default: "",
  },
});
</script>

<style>
</style>