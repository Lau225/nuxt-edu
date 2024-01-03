<template>
  <div>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <LoadingGroup
          :pending="pending"
          :error="error"
          :is-empty="rows.length === 0"
        >
          <div>
            <TestpaperList v-for="item,index in rows" :key="index" :item="item"/>
          </div>
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
      </n-grid-item>
      <n-grid-item :span="6">
        <hot-course-list />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { NButton, NGrid, NGridItem,NPagination } from "naive-ui";
useHead({
  title: "考试列表",
  meta: [
    { name: "description", content: "考试描述" },
    { name: "keywords", content: "考试关键词" },
  ],
});
const { page, limit, total, handlePageChange, rows, pending, error, refresh } =
  await usePage(({ page, limit }) => {   
    return useListApi("testpaper",{
      page
    });
  });
</script>

<style>
</style>