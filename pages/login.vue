<template>
  <n-form
    class="w-[350px]"
    :model="form"
    ref="formRef"
    :rules="rules"
    :inline="false"
    size="large"
  >
    <n-form-item path="username" :show-label="false">
      <n-input
        v-model:value="form.username"
        placeholder="用户名/手机/邮箱"
      ></n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="password">
      <n-input
        type="password"
        v-model:value="form.password"
        placeholder="密码"
      ></n-input>
    </n-form-item>
    <n-form-item v-if="type != 'login'" :show-label="false" path="repassword">
      <n-input
        :disabled="!form.password"
        type="password"
        v-model:value="form.repassword"
        placeholder="确认密码"
      ></n-input>
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <n-button text type="primary" size="medium" @click="changeType">
        {{ type === "login" ? "注 册" : "登 录" }}
      </n-button>
      <n-button text type="primary" size="medium">忘记密码？</n-button>
    </div>
    <div>
      <n-button class="w-full" type="primary" @click="onSubmit">
        {{ type === "login" ? "登 录" : "注 册" }}
      </n-button>
    </div>
    <div
      class="flex justify-center items-center w-full text-xs mt-5 text-gray-600"
    >
      注册即同意
      <n-button text type="primary" size="medium"
        >《服务协议》</n-button
      >
      和
      <n-button text type="primary" size="medium"
        >《隐私政策》</n-button
      >
    </div>
  </n-form>
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton } from "naive-ui";

const route = useRoute();

const type = ref("login");

const title = ref("登录");

useHead({ title });

const form = reactive({
  username: "",
  password: "",
  repassword: "",
});
const rules = computed(() => {
  let r = {
    username: [{
        required:true,
        message:type.value === 'login' ? '用户名/手机邮箱/必填' : '用户名必填'
    }],
    password: [
    {
        required:true,
        message:'密码必填'
    }
    ],
  };
  if(type.value != 'login'){
    r.repassword = [
        {
            required:true,
            message:'确认密码必填'
        },{
            validator(rule,value){
                return value === form.password
            },
            message:"两次密码输入不一致",
            trigger:["input","blur"]
        }
    ]
  }
  return r
});
const formRef = ref(null);
const changeType = () => {
  type.value = type.value === "login" ? "reg" : "login";
  title.value = type.value === "login" ? "登录" : "注册";
  route.meta.title = title.value;
  for (const key in form) {
    form[key] = "";
  }
  formRef.value.restoreValidation()
};
const onSubmit = () => {
    formRef.value.validate((errors)=>{
    if(errors) return 
    console.log("验证通过");
  })
};
definePageMeta({
  layout: "login",
});
</script>

<style>
</style>