<template>
  <div class="test_item">
    <div class="title">第{{ index + 1 }}题 {{ type[item.type] }}</div>
    <div class="p-4">
      <p v-html="item.title" class="mb-5"></p>

      <!-- 题目选项 -->
      <div
        v-if="
          item.type === 'radio' ||
          item.type === 'checkbox' ||
          item.type === 'trueOrfalse'
        "
      >
        <p class="tip">答案：</p>
        <ul>
          <li
            @click="handleChoose(qi)"
            class="option"
            :class="{ active: isActive(qi) }"
            v-for="(q, qi) in item.options"
            :key="qi"
          >
            <span class="mr-2">{{ en[qi] }}.</span>
            <div v-html="q"></div>
          </li>
        </ul>
      </div>

      <!-- 填空题 -->
      <div v-else-if="item.type === 'completion'">
        <div
          v-for="(uv, uvi) in modelValue"
          :key="uvi"
          class="mb-3 border rounded p-3"
        >
          <div class="flex items-center justify-between mb-3">
            <h5 class="text-sm">填空{{ uvi + 1 }}</h5>
            <n-icon v-if="uvi > 0" @click="remove(uvi)">
              <Close class="cursor-pointer" />
            </n-icon>
          </div>
          <n-input :placeholder="'填空' + (uvi + 1)" v-model:value="modelValue[uvi]" type="textarea"> </n-input>
        </div>
        <n-button class="w-full my-3" dashed="" type="primary" @click="add">
            添加填空
        </n-button>
        
      </div>
      <!-- 问答题 -->
      <div v-else>
        <div
          class="mb-3 border rounded p-3"
        >
          <n-input v-model:value="modelValue" type="textarea"> </n-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NIcon,NInput,NButton,createDiscreteApi } from "naive-ui";
import { Close } from "@vicons/ionicons5";
const props = defineProps({
  item: Object,
  index: Number,
});

const modelValue = ref(props.item.user_value);

// 题目类型
const type = {
  answer: "问答题",
  completion: "填空题",
  trueOrfalse: "判断题",
  checkbox: "多选题",
  radio: "单选题",
};

// 选项转化
const en = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
};

// 监听值的变化
const emit = defineEmits(["change"]);
watch(
  modelValue,
  (newVal) => {
    emit("change", unref(newVal));
  },
  {
    deep: true,
  }
);

// 单选或者多选是否选中
const isActive = (v) => {
  const { item } = props;
  if (item.type === "radio" || item.type === "trueOrfalse") {
    return modelValue.value === v;
  }
  return modelValue.value.includes(v);
};

const handleChoose = (val) => {
  const { item } = props;
  if (item.type === "radio" || item.type === "trueOrfalse") {
    modelValue.value = modelValue.value == val ? -1 : val;
  } else {
    let i = modelValue.value.findIndex((v) => v == val);
    if (i == -1) {
      modelValue.value.push(val);
    } else {
      modelValue.value.splice(i, 1);
    }
  }
};

// 移除填空
const remove = (index) => {
    const {dialog} = createDiscreteApi(["dialog"])
    dialog.create({
        content:"是否删除该填空",
        positiveText:"确定",
        negativeText:"取消",
        onPositiveClick(){
            modelValue.value.splice(index,1)
        }
    })
};
const add = () => {
    modelValue.value.push("")
}
</script>

<style scoped>
.test_item {
  @apply shadow rounded mb-5;
}
.title {
  @apply bg-gray-100 p-4 border-b text-sm;
}
.tip {
  @apply text-xs mb-3 text-gray-500;
}
.option {
  transition: all 0.5s;
  @apply flex border p-2 rounded text-sm cursor-pointer mb-2 hover:(!border-light-blue-500 !bg-light-blue-50 text-light-blue-600)
    active:(!bg-light-blue-200);
}
.active {
  @apply !border-light-blue-500 !bg-light-blue-50 text-light-blue-600;
}
</style>
