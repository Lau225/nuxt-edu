<template>
  <LoadingGroup :pending="pending" :error="error">
    <section
      class="py-4"
      v-if="
        data.isbuy &&
        ((data.type !== 'media' && type === 'course') || type === 'live')
      "
    >
      <ClientOnly>
        <template #fallback>
          <LoadingSkeleton />
        </template>
        <PlayerAudio
          v-if="data.type === 'audio'"
          :title="data.title"
          :url="data.content"
          :cover="data.cover"
        ></PlayerAudio>
        <PlayerVideo :url="data.content" v-else-if="data.type === 'video'" />
        <PlayerLive :url="data.playUrl" v-else-if="type === 'live'" />
      </ClientOnly>
    </section>

    <section v-else class="detail-top">
      <n-image
        :src="data.cover"
        class="image"
        :class="{ 'book-image': type === 'book' }"
        object-fit="cover"
      />
      <div class="info">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="text-xl mr-2">{{ data.title }}</span>
            <fava-btn :is_fava="data.isfava" :goods_id="data.id" :type="type" />
          </div>
          <p class="my-2 text-xs text-gray-400">{{ subTitle }}</p>
          <template v-if="!data.isbuy">
            <ActiveBar :data="data" v-if="data.group || data.flashsale"/>
            <template v-else>
              <div>
                <Price class="text-xl" :value="data.price" />
                <Price class="text-xs ml-1" through :value="data.t_price" />
              </div>
              <coupon-modal v-if="type !== 'live'" />
              <LiveStatusBar
                v-else
                :start="data.start_time"
                :end="data.end_time"
              />
            </template>
          </template>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <template v-if="type === 'book'">
            <template v-if="menus.length > 0">
              <n-button @click="buy" :loading="loading" type="primary"
                >立即学习</n-button
              >
              <n-button
                strong
                secondary
                class="ml-2"
                v-if="freeId"
                type="primary"
                size="medium"
                @click="learn({ id: freeId })"
              >
                免费试看
              </n-button>
            </template>
            <n-button v-else type="primary" disabled> 敬请期待 </n-button>
          </template>
          <n-button v-else @click="buy" :loading="loading" type="primary"
            >{{ btn }}</n-button
          >
        </div>
      </div>
    </section>

    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <section class="detail-bottom">
          <UiTab class="border-b">
            <UiTabItem
              @click="changeTab(item.value)"
              :active="tab === item.value"
              v-for="(item, index) in tabs"
              :key="index"
            >
              {{ item.label }}
            </UiTabItem>
          </UiTab>
          <div
            v-if="tab === 'content'"
            class="content"
            v-html="
              data.type == 'media' && data.isbuy ? data.content : data.try
            "
          ></div>
          <DetailMenu v-else>
            <DetailMenuItem
              @click="learn(item)"
              :item="item"
              :index="index"
              v-for="(item, index) in menus"
              :key="index"
            />
            <Empty :desc="暂无目录" v-if="menus.length == 0" />
          </DetailMenu>
        </section>
      </n-grid-item>
      <n-grid-item :span="6">
        <hot-course-list />
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>

<script setup>
import { NImage, NButton, NGrid, NGridItem, createDiscreteApi } from "naive-ui";
const route = useRoute();

// 获取query
const useRequestQuery = () => {
  const { column_id, flashsale_id, group_id } = route.query;
  let query = { id };
  if (column_id) {
    query.column_id = column_id;
  } else if (flashsale_id) {
    query.flashsale_id = flashsale_id;
  } else if (group_id) {
    query.group_id = group_id;
  }
  return query;
};

const { id, type } = route.params;

const query = useRequestQuery();

const freeId = computed(() => {
  let fid = 0;
  if (type === "book" && data.value) {
    let item = data.value.book_details.find((o) => o.isfree == 1);
    if (item) {
      fid = item.id;
    }
  }
  return fid;
});

const { data, error, pending, refresh } = await useReadDetailApi(type, query);

const title = computed(() => (!pending.value ? data.value?.title : "详情页"));

console.log(data);

useHead({ title });

const o = {
  media: "图文",
  video: "视频",
  audio: "音频",
};

const subTitle = computed(() => {
  let pre = "";
  if (type === "course") {
    pre = `【${o[data.value.type]}】 `;
  }
  return `${pre} ${data.value.sub_count}人学过`;
});

const menus = computed(() => {
  return (
    (type == "book" ? data.value.book_details : data.value.column_courses) || []
  );
});

const loading = ref(false);
const buy = () => {
  useHeadAuth(async () => {
    if (data.value.price == 0) {
      loading.value = true;
      const { error } = await useLearnApi({
        goods_id: data.value.id,
        type: type,
      });

      if (!error.value) {
        refresh();
      }

      return;
    }

    // 发起拼团
    if(data.value.group){
      loading.value = true
      const {error,data:res} =  await useCreateOrderApi({
        group_id:data.value.group.id,     
      },"group")
      loading.value = false
      if(!error.value){
        navigateTo(`/pay?no=${res.value.no}`)
      }
      return 
    }

    // 付费学习
    let ty = "course";
    let id = data.value.id;
    switch (type) {
      case "book":
        ty = "book";
        break;
      case "live":
        ty = "live";
        break;
      case "column":
        ty = "column";
        break;
    }
    if(data.value.flashsale){
      ty = "flashsale"
      id = data.value.flashsale.id
    }

    navigateTo(`/createorder?id=${id}&type=${ty}`);
  });
};

// 初始化tab
const useInitDetailTabs = (t) => {
  const tabs = computed(() => {
    let ts = [
      {
        label: "详情",
        value: "content",
      },
    ];

    if (t === "column" || t === "book") {
      ts.push({
        label: "目录",
        value: "menu",
      });
    }
    return ts;
  });

  const tab = ref("content");

  const changeTab = (e) => (tab.value = e);

  return {
    tabs,
    tab,
    changeTab,
  };
};

const { tabs, tab, changeTab } = useInitDetailTabs(type);
const btn = computed(()=>{
  if(data.value.group){
    return "立即拼团"
  }else if(data.value.flashsale){
    return "立即秒杀"
  }else{
    return "立即学习"
  }
})
const learn = (item) => {
  const { message } = createDiscreteApi(["message"]);
  useHeadAuth(() => {
    if (type === "column" && item.price !== 0 && !data.value.isbuy) {
      return message.error("请先购买该专栏");
    }
    let url = "";
    switch (type) {
      case "columb":
        url = `/detail/course/${item.id}?column_id=${data.value.id}`;
        break;
      case "book":
        url = `/book/${data.value.id}/${item.id}`;
        break;

      default:
        url = "";
    }
    navigateTo(url);
  });
};

// 初始化head
const useInitHead = () => {
  useHead({
    link: [
      {
        rel: "stylesheet",
        href: "/aplayer/Aplayer.min.css",
      },
    ],
    script: [
      {
        src: "/aplayer/Aplayer.min.js",
      },
      {
        src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js",
      },
      {
        src: "//unpkg.byted-static.com/xgplayer-flv/2.5.1/dist/index.min.js",
      },
    ],
  });
};

useInitHead();
</script>

<style scoped>
.detail-top {
  @apply rounded bg-white flex p-5 mb-5 my-1;
}

.detail-top .book-image {
  @apply rounded w-[130px] h-[180px] mr-8 ml-3;
}

.image {
  @apply rounded w-[340px] h-[200px] mr-5;
}
.info {
  @apply flex-1 flex flex-col py-2;
}
.detail-bottom {
  @apply bg-white rounded my-5;
}
.content {
  @apply px-5 pb-5;
}
.content img {
  max-width: 100%;
}
</style>