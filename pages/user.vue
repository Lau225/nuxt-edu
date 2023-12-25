<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="5">
      <ul class="center-menu">
        <li @click="navigate(item)" :class="{'active':item.name == activeName}" v-for="item,index in menus" :key="index">{{ item.title }}</li>
      </ul>
    </n-grid-item>
    <n-grid-item :span="19">
      <div class="bg-white rounded mb-10 !min-h-[75vh]">
        <NuxtPage :page-key="pageKey" />
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { NGrid, NGridItem } from "naive-ui";
const route = useRoute();
const pageKey = computed(() => route.fullPath);
const activeName = computed(()=>route.name)
const menus = [
  {
    title: "学习记录",
    name: "user-history-page",
  },
  {
    title: "购买记录",
    name:"user-buy-page"
  },
  {
    title: "我的考试",
    name:"user-test-page"
  },
  {
    title: "我的帖子",
    name:"user-post-page"
  },
  {
    title: "优惠券记录",
  },
  {
    title: "我的收藏",
  },
  {
    title: "修改资料",
  },
  {
    title: "修改密码",
  },
  {
    title: "其他设置",
  },
];
const navigate = (item) => {
    navigateTo({
        name:item.name,
        params:{
            page:1
        }
    })
}
definePageMeta({
    middleware:["auth"]
})
</script>

<style scoped>
.center-menu {
  @apply list-none bg-white rounded;
}
.center-menu li {
  @apply px-5 py-3 text-sm cursor-pointer hover:bg-blue-50;
}
.active {
  @apply font-bold text-blue-500 bg-gray-200;
}
</style>