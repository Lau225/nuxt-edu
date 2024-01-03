<template>
  <LoadingGroup :pending="pending" :error="error">
    <n-card class="createorder">
      <h4>产品信息</h4>
      <div class="flex mb-5">
        <n-image class="rounded flex-shrink-0 w-[180px] h-[100px]"
         :src="data.cover" 
         :class="type === 'book' ? 'w-[100px]':'w-[180px]'"/>
        <div class="flex flex-1 ml-4 flex-col">
          <h5 class="flex text-xl text-gray-500">
            {{ data.title }}
            <Price :value="data.price" class="ml-auto" />
          </h5>
          <div class="mt-auto" v-if="type === 'course'">
            <n-tag :bordered="false" size="small"> {{ t[data.type] }} </n-tag>
          </div>
        </div>
      </div>
      <h4>优惠券</h4>
      <n-grid :x-gap="20" class="mb-3">
        <n-grid-item v-for="item,index in couponData.rows" :key="index">
            <n-button :type="user_coupon_id === item.id ? 'warning': 'default'" @click="chooseCoupon(item)" strong secondary type="tertiary">
               ￥{{ item.price }} 优惠券 
            </n-button>
        </n-grid-item>
      </n-grid>
      <div v-if="couponData.count === 0" class="text-gray-400 text-sm mb-5">无优惠券</div>
      <h4>支付方式</h4>
      <div class="flex mb-5">
        <span class="wxpay">
          <n-icon>
            <LogoWechat />
          </n-icon>
          <b>微信支付</b>
        </span>
      </div>

      <div class="flex items-center mb-5">
        <small class="text-red-500 mr-auto">请在30分钟之内支付</small>
        <span v-if="user_coupon_id">优惠券已抵扣<b class="text-red-500">{{ coupon_price }}元，</b></span>
        需要支付<Price :value="price" />
      </div>

      <div class="flex justify-end">
        <n-button :loading="loading" @click="submit" type="primary">确认支付</n-button>
      </div>
    </n-card>
  </LoadingGroup>
</template>

<script setup>
import {
  NCard,
  NImage,
  NTag,
  NIcon,
  NButton,
  NGrid,
  NGridItem,
} from "naive-ui";

import { LogoWechat } from "@vicons/ionicons5";

const route = useRoute();

const { id, type } = route.query;

const { data, pending, error } = await useGetGoodsInfoApi(id, type);

const t = {
    media:"图文",
    video:"视频",
    audio:"音频",
    column:"专栏",
    course:"课程"
}

definePageMeta({
    middleware:["auth","createorder"]
})

// 获取可用优惠券
const {data:couponData} = await useGetUseableUserCouponApi(id,type)
console.log(couponData.value);
const user_coupon_id = ref(0)
// 选中优惠券方法
const chooseCoupon = (item) => {
    user_coupon_id.value = user_coupon_id.value == item.id ? 0 : item.id
}

const coupon_price = computed(()=>{
    if(user_coupon_id.value === 0) return 0
    let c = couponData.value.rows.find(o=>o.id === user_coupon_id.value)
    return c ? c.price : 0
})

const price = computed(()=>{
    let p = ((data.value.price * 1000 - coupon_price.value * 1000) / 1000).toFixed(2)
    return p <= 0 ? 0 : p
})

const loading = ref(false)

const submit = async () => {

  let d = {}

  if(type === 'course' || type === 'column' || type === 'book'){
    d = {
      goods_id:data.value.id,
      type
    }
    if(user_coupon_id.value){
      d.user_coupon_id = user_coupon_id.value
    }
  }

  loading.value = true
  const {data:createOrderResult,error:createOrderError} = await useCreateOrderApi(d)
  loading.value = false
  if(createOrderError.value) return 
  navigateTo(`/pay?no=${createOrderResult.value.no}`,{replace:true})
}

</script>

<style scoped>
.createorder {
  @apply mb-5;
}
h4 {
  @apply font-semibold mb-3 text-gray-600;
}
.wxpay {
  @apply flex items-center justify-center border border-green-500 rounded py-3 text-sm text-green-600 w-[120px];
}
</style>
