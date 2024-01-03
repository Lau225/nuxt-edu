<template>
  <div class="active-bar" v-show="!isEnd">
    <div class="top">
        <span>
            {{ type === 'group' ? `${data.group.p_num}人拼团`:`${ data.flashsale.used_num }人已抢/剩${ data.flashsale.s_num } 名`}}
        </span>
        <span class="flex items-center">
            倒计时
            <CountDown @end="isEnd = true" :time="data[type].end_time"/>
        </span>
    </div>
    <div class="bottom">
        <Price class="text-xl" :value="data[type].price"/>
        <Price through class="text-subtitle-2 ml-1" :value="data.price"/>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
        data:Object
    })
    const isEnd = ref(false)
    const type = computed(()=>props.data.group ? "group" : "flashsale")
</script>

<style scoped>
.active-bar{
    @apply w-[350px] mb-5;
}
.top{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    @apply  bg-red-500 text-white flex justify-between text-xs px-3 py-2;
}
.bottom{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    @apply px-3 py-2 border border-red-500;
}
</style>