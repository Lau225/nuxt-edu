<template>
  <n-form
    class="w-[350px]"
    :model="form"
    ref="formRef"
    :rules="rules"
    :inline="false"
    size="large"
  >
    <n-form-item path="phone" :show-label="false">
      <n-input
        v-model:value="form.phone"
        placeholder="手机号"
      ></n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="code">
      <n-input-group>
        <n-input
        v-model:value="form.code"
        placeholder="验证码"
        :style="{width:'75%'}"
      ></n-input>
      <send-code :phone="form.phone"/>
      </n-input-group>
    </n-form-item>
    <div>
      <n-button
        class="w-full"
        type="primary"
        @click="onSubmit"
        :loading="loading"
      >
        绑 定
      </n-button>
    </div>
  </n-form>
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi,NInputGroup } from "naive-ui";

const loading = ref(false);

useHead({ title: "绑定手机号" });

const form = reactive({
  phone: "",
  code: "",
});
const rules = {
  phone: [
    {
      required: true,
      message:"手机号必填"
    },
  ],
  code: [
    {
      required: true,
      message: "验证码必填",
    },
  ],
};
const formRef = ref(null);

const onSubmit = () => {};
definePageMeta({
    layout:'login',
    title:"绑定手机号"
})
</script>

<style>
</style>