<template>
    <n-form
      class="w-[350px]"
      :model="form"
      ref="formRef"
      :rules="rules"
      :inline="false"
      size="large"
      @keydown.enter="onSubmit"
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
    <n-form-item :show-label="false" path="password">
      <n-input
        show-password-on="mousedown"
        type="password"
        v-model:value="form.password"
        placeholder="密码"
      ></n-input>
    </n-form-item>
      <n-form-item :show-label="false" path="repassword">
        <n-input
          :disabled="!form.password"
          show-password-on="mousedown"
          type="password"
          v-model:value="form.repassword"
          placeholder="确认密码"
        ></n-input>
      </n-form-item>
      <div class="flex justify-between w-full mb-2">
        <n-button text type="primary" size="medium" @click="$router.go(-1)">
          立即登录
        </n-button>
      </div>
      <div>
        <n-button
          class="w-full"
          type="primary"
          @click="onSubmit"
          :loading="loading"
        >
          重置密码
        </n-button>
      </div>
    </n-form>
  </template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  createDiscreteApi,
  NInputGroup
} from "naive-ui";

const route = useRoute();

const loading = ref(false);

useHead({ title:"忘记密码" });

const form = reactive({
  phone: "",
  code:"",
  password: "",
  repassword: "",
});
const rules = {
    phone: [
      {
        required: true,
        message: "手机号必填",
      },
    ],
    code: [
      {
        required: true,
        message: "验证码必填",
      },
    ],
    password: [
      {
        required: true,
        message: "密码必填",
      },
    ],
    repassword:[
      {
        required: true,
        message: "确认密码必填",
      },
      {
        validator(rule, value) {
          return value === form.password;
        },
        message: "两次密码输入不一致",
        trigger: ["input", "blur"],
      },
    ]
  };
const formRef = ref(null);
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
        
  });
};
definePageMeta({
    title:"忘记密码",
    layout: "login",
});
</script>
<style>

</style>