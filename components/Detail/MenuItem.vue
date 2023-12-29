<template>
    <li class="detail-menu-item">
        <n-tag type="primary" :bordered="false" size="small" class="mr-3">
            {{ t[item.type] }}
        </n-tag>
        章节 {{ index + 1 }}.{{ item.title }}
        <n-tag v-if="item.price === 0" type="success" :bordered="false" size="small" class="ml-auto">
            免费
        </n-tag>
    </li>
</template>

<script setup>
    import {NTag} from 'naive-ui'
    defineProps({
        item:Object,
        index:Number
    })
    const t = {
        media:"图文",
        audio:"音频",
        video:"视频"
    }
</script>
<style scoped>
.detail-menu-item{
    @apply flex p-5 border-b cursor-pointer text-sm hover:!bg-gray-100 active:!bg-gray-200;
}
</style>