<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
      <div>
        <PostList v-for="item,index in rows" :key="index" :item="item"></PostList>
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
useHead({title:"我的帖子"})
const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useMypostListApi(page)
})
</script>

<style>

</style>