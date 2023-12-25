<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
      <div>
        <UserTestList v-for="item,index in rows" :key="index" :item="item"></UserTestList>
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
</template>

<script setup>
import {NPagination} from 'naive-ui'
useHead({title:"考试记录"})
const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useUserTestApi(page)
})
</script>

<style>

</style>