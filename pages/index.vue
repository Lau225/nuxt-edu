<template>
    <div>
        {{ data }}
    </div>
</template>
<script setup>
    const {data} = await useFetch('http://demonuxtapi.dishait.cn/pc/index',{
        key:"IndexData",
        headers:{
            appid:"bd9d01ecc75dbbaaefce"
        },
        // 响应之前的数据处理
        transform:(res) => {
            return res.data
        } 
    })
</script>