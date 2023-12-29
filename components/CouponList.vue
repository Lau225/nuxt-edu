<template>
  <n-card class="coupon" :class="{ 'coupon-disabled': item.isgetcoupon }">
    <h4>￥{{ item.price }}</h4>
    <p>适用{{ o[item.type] }}:{{ item.value.title }}</p>
    <p>
      有效期:
      <n-time :time="new Date(item.start_time)" />
      ~
      <n-time :time="new Date(item.end_time)" />
    </p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          size="small"
          :loading="loading"
          @click="submit"
          :disabled="item.isgetcoupon"
          :type="item.isgetcoupon ? '' : 'warning'"
        >
          {{ item.isgetcoupon ? "已领取" : "立即领取" }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>
  
<script setup>
import { NCard, NButton, NTime,createDiscreteApi } from "naive-ui";
const props = defineProps({
  item: Object,
});

const o = {
  course: "课程",
  column: "专栏",
};

const loading = ref(false)

const isgetcoupon = ref(props.item.isgetcoupon)

const {message} = createDiscreteApi(["message"])
const submit = () => {
    if(isgetcoupon.value){
        return message.error("你已经领取过了")
    }else{
        useHeadAuth(async ()=>{
            loading.value = true
            const {error} = await useReceiveUserCouponApi({
                coupon_id:props.item.value.id
            })
            loading.value = false
            if(error.value) return
            message.success("领取成功！")
            isgetcoupon.value = true
        })
    }
}
</script>
  
<style scoped>
.coupon {
  @apply mb-5 !bg-orange-500 !border-0;
}
.coupon-disabled {
  @apply !bg-gray-300;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
</style>
  
  