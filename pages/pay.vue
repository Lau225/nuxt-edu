<template>
  <div class="flex justify-center">
    <n-card class="w-[450px] mb-10">
      <ClientOnly>
        <n-alert v-if="isPay" class="mb-2" title="支付成功" type="success">
          正在跳转
        </n-alert>
        <n-alert v-else-if="isTimeOut" class="mb-2" title="支付已超时" type="error">
          请刷新页面重新支付
        </n-alert>  
        <h4 class="text-xl mb-2">微信支付</h4>
        <p class="text-sm text-gray-500 flex">
          距离二维码过期还剩<time-box class="text-rose-500" :expire="5" @end="hanleTimeOut"/>,过期后请刷新页面重新获取
        </p>
        <h5 class="flex justify-center py-5">
          支付总额：
          <Price :value="data.price"/>
        </h5>
        <!-- 二维码组件 -->
        <QrCode :data="data.code_url" v-if="data.code_url"/>
        <div class="flex justify-center items-center py-4 text-green-500">
          <n-icon :size="35">
            <ScanCircleOutline/>
          </n-icon> 
          <div class="ml-3 text-gray-500 text-sm">
            <p>
              请使用微信扫一扫
            </p>
            <p>扫描二维码支付</p>
          </div>
        </div>
      </ClientOnly>
    </n-card>    
  </div>
</template>

<script setup>
import {NCard,NAlert,NIcon} from 'naive-ui'
import {ScanCircleOutline} from '@vicons/ionicons5'

const route = useRoute()

const {no} = route.query

const {data,error} = await useWxPayApi(no)
console.log(data.value);
// 支付超时
const isTimeOut = ref(false)
const hanleTimeOut = () => {
  isTimeOut.value = true
}

const isPay = ref(false)

const timer = ref(null)

// 支付成功处理
const hanleSuccess = () => {
  isPay.value = true 
  if(timer.value) clearInterval(timer.value)
  setTimeout(() => {
    navigateTo("/user/buy/1",{replace:true})
  }, 2000);
}

const checkIsPay = () => {
  if(timer.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    useIsWxPayApi(no).then(res=>{
      if(!res.error.value && res.data.value.trade_state === "SUCCESS"){
        hanleSuccess()
      }
    })
  }, 2000);
}

if(!error.value){
  checkIsPay()
}


</script>

<style>

</style>