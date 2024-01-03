<template>
  <div>
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item>
        <NuxtLink to="/">首页</NuxtLink>
         </n-breadcrumb-item>
      <n-breadcrumb-item>
         {{ title }}</n-breadcrumb-item>
      </n-breadcrumb>
    <LoadingGroup
      :pending="pending"
      :error="error"
      :is-empty="rows.length === 0"
    >
      <template #loading>
        <LoadingBookSkeleton v-if="type === 'book'"/>
        <LoadingCourseSkeleton v-else></LoadingCourseSkeleton>
      </template>
      <n-grid :x-gap="20" :cols="type === 'book' ? 2 : 4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <BookList  v-if="type === 'book'" :item="item"/>
          <course-list v-else :item="item"></course-list>
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
import { NGrid, NGi, NPagination,NBreadcrumb,NBreadcrumbItem } from "naive-ui";
const route = useRoute();
const { type } = route.params;
const title = route.meta.title
definePageMeta({
  middleware:["list"]
})

const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {

    let query = {
      page
    }

    if(type === 'group' || type === 'flashsale'){
      query.usable = 1
    }
    
    return useListApi(type,query);
  });

watch(
  () => route.query.keyword,
  (newValue) => {
    title.value = newValue;
    refresh();
  }
);
</script>

<style>
</style>