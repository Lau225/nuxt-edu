<template>
  <div>
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item>
        <NuxtLink to="/">首页</NuxtLink>
         </n-breadcrumb-item>
      <n-breadcrumb-item>
         课程列表</n-breadcrumb-item>
      </n-breadcrumb>
    <LoadingGroup
      :pending="pending"
      :error="error"
      :is-empty="rows.length === 0"
    >
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
import { NGrid, NGi, NPagination,NBreadcrumb,NBreadcrumbItem } from "naive-ui";
const route = useRoute();
const { type } = route.params;
useHead({ title: "课程列表" });

const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {
    return useCourseListApi(page);
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