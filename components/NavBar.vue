<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <n-button text class="!text-xl font-bold">蚂蚁课堂</n-button>
      <div class="menu">
        <div @click="handleOpen(item.path)" :class="path === item.path? 'menu-item menu-item-active':'menu-item'" :key="index" v-for="item,index in menu">
          {{item.name}}
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
]

const menu = [
  {
    name:'首页',
    path:'/'
  },
  {
    name:'考试',
    path:'/paper/1'
  },
  {
    name:'拼团',
    path:'/list/group/1'
  },
  {
    name:'秒杀',
    path:'/list/flashsale/1'
  },
  {
    name:'直播',
    path:'/list/live/1'
  },
  {
    name:'专栏',
    path:'/list/column/1'
  },
  {
    name:'电子书',
    path:'/list/book/1'
  },
  {
    name:'社区',
    path:'/bbs/0/1'
  },
  {
    name:'课程',
    path:'/list/course/1'
  },
]

const handleOpen = (path) => {
  navigateTo(path)
}
const {path} = useRoute()

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