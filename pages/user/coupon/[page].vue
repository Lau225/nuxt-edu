<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
      <div>
        <n-grid :x-gap="20" :cols="2">
          <n-grid-item v-for="item,index in rows" :key="index">
            <UserCouponList :item="item"></UserCouponList>
          </n-grid-item>
        </n-grid>
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
import {NPagination,NGrid,NGridItem} from 'naive-ui'
useHead({title:"优惠券记录"})
const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useUserCouponApi(page)
})
console.log(rows);
</script>

<style>

</style>