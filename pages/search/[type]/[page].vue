<template>
  <div>
    <h5 class="text-lg md-3">"{{ title }}"的搜索和结果</h5>
    <UiTab>
      <UiTabItem
        @click="hanleClick(item.value)"
        :active="item.value === type"
        v-for="(item, index) in tabs"
        :key="index"
      >
        {{ item.label }}
      </UiTabItem>
    </UiTab>

    <LoadingGroup :pending="pending" :error="error">
      <template #loading>
        <LoadingCourseSkeleton></LoadingCourseSkeleton>
      </template>
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <course-list :item="item"></course-list>
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
        <n-pagination
          size="large"
          :item-count="total"
          :page-size="limit"
          :page="page"
          :on-update-page="handlePageChange"
        />
      </div>
    </LoadingGroup>
  </div>
</template>

<script setup>
import { NGrid, NGi, NPagination } from "naive-ui";
const route = useRoute();
let title = ref(route.query.keyword);
useHead(title);
const tabs = [
  {
    label: "课程",
    value: "course",
  },
  {
    label: "专栏",
    value: "column",
  },
];
const type = ref(route.params.type);
const hanleClick = (t) => {
  navigateTo({
    params: {
      ...route.params,
      type: t,
    },
    query: {
      ...route.query,
    },
  });
};


const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useSearchListApi(()=>{
        return {
            page,
            keyword:encodeURIComponent(title.value),
            type:type.value
        }
    })
})

watch(
  () => route.query.keyword,
  (newValue) => {
    title.value = newValue
    refresh();
  }
);

definePageMeta({
  middleware: ["search"],
});
</script>

<style>
</style>