<template>
  <n-button
    :loading="loading"
    secondary
    strong
    :type="isFava ? 'primary' : 'tertiary'"
    size="tiny"
    @click="handleFava"
  >
    收藏
  </n-button>
</template>

<script setup>
import { NButton } from "naive-ui";
const loading = ref(false);
const props = defineProps({
  is_fava: {
    type: Boolean,
    default: false,
  },
  goods_id:{
    type:Number,
    default:0
  },
  type:{
    type:String,
    default:""
  }
});
const isFava = ref(props.is_fava);
const handleFava = () => {
  // 登录之后才能进行收藏和取消收藏
  useHeadAuth(async () => {
    loading.value = true;

    const {error} = isFava.value ? (await useUncollectApi({
        goods_id:props.goods_id,
        type:props.type
    })) : (await useCollectApi({
        goods_id:props.goods_id,
        type:props.type
    }))

    loading.value = false

    if(error.value) return 

    isFava.value = !isFava.value

  });
};
</script>

<style>
</style>