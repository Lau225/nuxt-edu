<template>
  <n-drawer v-model:show="active" placement="top">
    <div class="h-full flex justify-center items-center">
      <n-input-group class="flex justify-center items-center">
        <n-input size="large" v-model="keyword" placeholder="请输入关键词" :style="{ width: '500px' }" />
        <n-button size="large" @click="handleClick" :disabled="!keyword" type="primary" ghost> 搜索 </n-button>
      </n-input-group>
    </div>
  </n-drawer>
</template>

<script setup>
import { NDrawer,NInput,NButton,NInputGroup } from "naive-ui";
const active = ref(false);
const keyword = ref('');
const open = () => {
  active.value = true;
};

const handleClick = () => {
    console.log("搜索");
}

defineExpose({
  open,
});
</script>

<style>
</style>