<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <n-button text class="!text-xl font-bold">蚂蚁课堂</n-button>
      <div class="menu">
        <div :class="index===0? 'menu-item menu-item-active':'menu-item'" :key="index" v-for="item,index in 8">
          {{ '分类' + item }}
        </div>
      </div>
      <n-button circle class="ml-auto mr-3">
        <template #icon>
          <n-icon><Search /></n-icon>
        </template>
      </n-button>
      <!-- <n-button secondary strong>登录</n-button> -->
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-dropdown>
    </div>
  </div>
  <div class="w-[100%] h-[80px]" />
</template>

<script setup>
import { NButton, NIcon, NDropdown,NAvatar } from "naive-ui";
import { Search } from "@vicons/ionicons5";

const options = [
  {
    label: "用户中心",
    key: "center",
  },
  {
    label: "退出",
    key: "logout",
  },
];
</script>

<style>
.navbar {
  z-index: 1000;
  @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
.menu{
  @apply  flex items-center px-4;
}
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