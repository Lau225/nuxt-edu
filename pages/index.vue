<template>
  <LoadingGroup :pedding="pending" :error="error">
    <template v-for="(item, index) in data" :key="index">
      <Banner :data="item.data" v-if="item.type === 'swiper'"></Banner>
      <ImageView
        :data="item.data"
        v-else-if="item.type === 'icons'"
      ></ImageView>
      <ImageAd :data="item.data" v-else-if="item.type === 'imageAd'"></ImageAd>
      <ListCard
        :title="item.title"
        :data="item.data"
        v-else-if="item.type === 'list'"
      ></ListCard>
      <ListCard
        :type="item.listType"
        :title="item.title"
        :data="item.data"
        v-else-if="item.type === 'promotion'"
      ></ListCard>
    </template>
  </LoadingGroup>
</template>
<script setup>
useHead({
  title: "课堂首页",
  meta: [
    { name: "description", content: "首页描述" },
    { name: "keywords", content: "首页关键词" },
  ],
});

const { data, pending, refresh, error } = await useIndexDataApi();
// 服务端报错
if (process.server && error.value) {
  showError(error.value?.data?.data);
}
</script>