<template>
  <div class="border-b p-5 ">
    <div class="cursor-pointer text-gray-600" @click="open">
        <n-tag v-if="item.is_top" type="success" size="small">置顶</n-tag>
        {{ item.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer" style="max-width: 500px;">
        <n-image 
        preview-disabled
        v-for="img,index in item.desc.images"
        :key="index" :src="img" 
        :width="item.desc.images.length == 1 ? 300 : 150"
        :height="item.desc.images.length == 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"/>
    </div>
    <div class="flex mt-5">
        <n-button  @click.stop="handleSupport(item)" class="mr-3" secondary strong :type="item.issupport ? 'primary': 'tertiary'" size="tiny">
            <template #icon>
                <ThumbsUpSharp/>
            </template>
            点赞 {{ item.support_count || '' }}
        </n-button>
        <n-button class="mr-3" secondary strong size="tiny">
            <template #icon>
                <ChatboxEllipsesOutline/>
            </template>
            评论 {{ item.comment_count || '' }}
        </n-button>
        <n-button class="mr-3" text size="tiny">
            作者 {{item.user.name}}
        </n-button>
        <n-button :loading="loading" @click="deleteItem" class="mr-3" type="error" size="tiny">
            删除
        </n-button>
    </div>
  </div>
</template>

<script setup>
import {NTag,NImage,NButton,createDiscreteApi, messageDark} from 'naive-ui'
import {ThumbsUpSharp,ChatboxEllipsesOutline} from '@vicons/ionicons5'
const props = defineProps({
    item:Object
})


// 处理点赞和取消点赞
const {
    handleSupport
} = useHandleSupportPost()

const loading = ref(false)

const emit = defineEmits(["delete"])

const deleteItem = () => {
    const {dialog,message} = createDiscreteApi(["dialog","message"])
    dialog.warning({
        content:"是否要删除该帖子",
        positiveText:"确定",
        negativeText:"取消",
        onPositiveClick: async () =>{
            loading.value = true
            emit("delete",{
                id:props.item.id,
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
    navigateTo("/post_detail/"+props.item.id)
}
</script>

<style>

</style>