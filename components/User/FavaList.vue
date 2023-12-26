<template>
  <div class="border flex p-3 mb-5 items-center">
    <NTag class="mr-2" type="info" size="small">
        {{ o[item.type] }}
    </NTag>
    <NImage :src="item.goods.cover" class="w-[40px] rounded mr-2"></NImage>
    <span class="text-gray-500 text-sm">{{ item.goods.title }}</span>
    <n-button class="ml-auto mr-3" type="primary" size="tiny" @click="open">查看</n-button>
    <n-button type="error" size="tiny" :loading="loading" @click="deleteItem">删除</n-button>
    
  </div>
</template>

<script setup>
import {NTag,NImage,NButton,createDiscreteApi} from 'naive-ui'
const props = defineProps({
    item:Object
})

const o = {
    course:"课程",
    book:"电子书",
    column:"专栏",
    live:"直播"
}
const emit = defineEmits(["delete"])
const loading = ref(false)
const deleteItem = () => {
    const {dialog,message} = createDiscreteApi(["dialog","message"])
    dialog.warning({
        content:"是否要取消收藏",
        positiveText:"确定",
        negativeText:"取消",
        onPositiveClick: async () =>{
            loading.value = true
            emit("delete",{
                goods_id:props.item.goods.id,
                type:props.item.type,
                success(){
                    message.success("删除成功")
                    loading.value = false
                },
                fail(){
                    loading.value = false
                }
            })
        }
    })
}
const open = () => {
    navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`)
}
</script>

<style>

</style>