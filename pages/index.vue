<template>
    <div>
        <template v-if="pending">
            加载中...
        </template>
        <template v-else-if="error">
            {{ error?.data?.data }}
        </template>
        <template v-else>
            <template v-for="(item,index) in data" :key="index">
                <Banner :data="item.data" v-if="item.type === 'swiper'"></Banner>
                <ImageView :data="item.data" v-else-if="item.type === 'icons'"></ImageView>
                <ImageAd :data="item.data" v-else-if="item.type === 'imageAd'"></ImageAd>
                <ListCard :title="item.title" :data="item.data" v-else-if="item.type === 'list'"></ListCard>
                <ListCard :type="item.listType" :title="item.title" :data="item.data" v-else-if="item.type === 'promotion'"></ListCard>
            </template>
        </template>
    </div>
</template>
<script setup>
    const {data,pending,refresh,error} = await useFetch('http://demonuxtapi.dishait.cn/pc/index',{
        key:"IndexData",
        headers:{
            appid:"bd9d01ecc75dbbaaefce"
        },
        // 响应之前的数据处理
        transform:(res) => {
            return res.data
        },
        // 是否开启缓存
        initialCache:false,
        // 懒加载,配合pending使用
        lazy:true
    })
    // 服务端报错
    if(process.server && error.value){
        showError(error.value?.data?.data)
    }
</script>