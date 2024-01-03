<template>
  <div class="text-center">
    {{ toHHmmss(time_out) }}
  </div>
</template>

<script setup>
    const props = defineProps({
        expire:{
            type:Number,
            default:120
        }
    })

    const toHHmmss = (data) => {
        let s;
        let hours = parseInt((data % (60 * 60 * 24)) / (60 * 60));
        let minutes = parseInt((data % (60 * 60)) / 60);
        let seconds = data % 60;
        s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
        return s;
    }


    let timer = null
    const time_out = ref(0)
    const emit = defineEmits(["end"])
    const hanleTimeOut = () => {
        // 时间结束
        if(time_out.value === 0){
            emit("end")
            return clearInterval(timer)
        }else{
            time_out.value--
        }
    }

    // 初始化倒计时
    const initTimeBox = () => {
        if(timer){
            clearInterval(timer)
        }
        time_out.value = props.expire * 60
        if(time_out.value > 0){
            let timer = setInterval(hanleTimeOut, 1000);
        }
    }

    onMounted(()=>{
        initTimeBox()
    })

    onBeforeUnmount(()=>{
        clearInterval(timer)
    })
</script>

<style>

</style>