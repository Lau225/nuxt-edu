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
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <course-list :item="item"></course-list>
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
        <n-pagination
            size="large"
            :item-count="data?.count"
            :page-size="limit"
            :page="page"
            :on-update-page="handlePageChange"
            />
      </div>
    </LoadingGroup>
  </div>
</template>

<script setup>
import { NGrid, NGi,NPagination } from "naive-ui";
const route = useRoute();
const title = route.query.keyword;
const limit = ref(10)
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
const page = ref(parseInt(route.params.page));
const { data, pending, refresh, error } = await useSearchListApi({
  page: page.value,
  keyword: encodeURIComponent(title),
  type: type.value,
});

const rows = computed(() => data.value?.rows ?? []);

const handlePageChange = (p) => {
    navigateTo({
        params:{
            ...route.params,
            page:p
        },
        query:{
            ...route.query
        }
    })
}
definePageMeta({
  middleware: ["search"],
});
</script>

<style>
</style>