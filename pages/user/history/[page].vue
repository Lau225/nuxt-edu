<template>
  <div>
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
      <div>
        {{ rows }}
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
  </div>
</template>

<script setup>
import { NGrid, NGi, NPagination } from "naive-ui";
const route = useRoute();
useHead({title:"学习记录"});
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
const type = ref(route.query.tab || 'course');
const hanleClick = (t) => {
  navigateTo({
    params: {
      ...route.params,
    },
    query: {
      ...route.query,
      tab:t
    },
  });
};


const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useUserHistoryApi(()=>{
        return {
            page,
            type:type.value
        }
    })
})

</script>

<style>
</style>