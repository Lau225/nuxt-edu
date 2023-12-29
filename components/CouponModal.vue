<template>
  <ClientOnly>
    <n-popover placement="right" :width="450" trigger="click">
        <template #trigger>
            <n-button secondary strong size="tiny" type="warning">领取优惠券</n-button>
        </template>
        <div class="p-2">
            <h4 class="text-lg font-bold mb-3">可有优惠券({{ data.length }})</h4>
            <n-scrollbar style="height:400px">
                <CouponList v-for="item,index in data" :key="index" :item="item"></CouponList>
            </n-scrollbar>
        </div>
    </n-popover>
  </ClientOnly>
</template>

<script setup>
    import {NPopover,NButton,NScrollbar} from 'naive-ui'
    const {
        data
    } = await useCouponListApi()
    console.log(data);
</script>

<style>

</style>