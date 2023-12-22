<template>
    <n-button type="primary" ghost @click="send" :loading="loading" :disabled="time>0||!phone">
        {{ text }}
    </n-button>
</template>

<script setup>
import {NButton,createDiscreteApi } from "naive-ui";
const props = defineProps(["phone"])
const loading = ref(false)
const time = ref(0)
const text = computed(()=>{
    if(loading.value){
        return "发送中..."
    }
    if(time.value > 0){
        return `${time.value}秒`
    }
    return "发送验证码"
})
const send = async () => {
    console.log(props.phone);
    loading.value = true
    const timer = ref(null)
    const {data,error} = await usePhoneCallApi(props.phone)
    console.log(data,error);
    loading.value = false
    if(error.value) return
    if(timer.value) clearInterval (timer.value)
    time.value = 60
    setInterval(()=>{
        time.value --
        if(time.value<=0){
            clearInterval(timer.value)
        }
    },1000)
    const {message} = createDiscreteApi(["message"])
    const msg = data.value == "ok" ? "发送成功" : `你的验证码是${data.value}`
    message.success(msg)
}
</script>