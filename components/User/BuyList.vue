<template>
  <UiCard>
    <UiCardHeader class="flex justify-between">
        <span>订单时间:{{ item.created_time }}</span>
        <span>订单号:{{ item.no }}</span>
    </UiCardHeader>
    <UiCardBody>
        {{ item.goods }}
    </UiCardBody>
    <UiCardFooter class="flex ">
        <span v-if="item.type != 'default'">{{ t[item.type] }}</span>
        <Price :value="item.price"/>
        <span class="ml-auto" :class="{'text-green-600':(item.status === 'success')}">
            {{ s[item.status] }}
        </span>
        <n-button type="primary" size="small" class="ml-3" v-if="item.status === 'pendding'">立即支付</n-button>
           
    </UiCardFooter>
  </UiCard>
</template>

<script setup>
import {NButton} from 'naive-ui'
defineProps({
    item:Object
})

const s = {
    closed:"已关闭",
    success:"支付成功",
    pendding:"等待支付",
}

const t = {
    group:"拼团",
    flashsale:"秒杀"
}
</script>

<style>
</style>