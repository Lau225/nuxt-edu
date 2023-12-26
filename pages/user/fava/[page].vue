<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
      <div>
        <UserFavaList @delete="handleDeleteItem" :item="item" v-for="item,index in rows" :key="index"></UserFavaList>
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
useHead({title:"收藏列表"})
const {page,limit,total,handlePageChange,rows,pending,error,refresh} = await usePage(({page,limit})=>{
    return useUserFavaApi(page)
})
console.log(rows);
const handleDeleteItem = async ({goods_id,type,success,fail}) => {
  const {error} = await useUncollectApi({
    goods_id,type
  })
  if(error.value){
    fail()
  }else{
    success()
    refresh()
  }
}
</script>

<style>

</style>