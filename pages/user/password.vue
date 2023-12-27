<template>
  <div class="p-5">
    <n-form
      :model="form"
      ref="formRef"
      label-placement="left"
      label-width="80"
      :rules="rules"
      :inline="false"
      @keydown.enter="onSubmit"
    >
      <n-form-item path="opassword" label="原密码">
        <n-input v-model:value="form.opassword" placeholder="原密码"></n-input>
      </n-form-item>
      <n-form-item path="password" label="新密码">
        <n-input v-model:value="form.password" placeholder="新密码"></n-input>
      </n-form-item>
      <n-form-item label="确认密码" path="repassword">
        <n-input
          :disabled="!form.password"
          show-password-on="mousedown"
          type="password"
          v-model:value="form.repassword"
          placeholder="确认密码"
        ></n-input>
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit" :loading="loading">
          立即修改
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  createDiscreteApi,
  NInputGroup,
} from "naive-ui";

const router = useRouter();

const loading = ref(false);

useHead({ title: "忘记密码" });

const form = reactive({
  opassword: "",
  password: "",
  repassword: "",
});
const rules = {
  opassword: [
    {
      required: true,
      message: "原密码必填",
    },
  ],
  password: [
    {
      required: true,
      message: "密码必填",
    },
  ],
  repassword: [
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
  ],
};
const formRef = ref(null);
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    let { data, error } = await useUpdatePasswordApi(form);
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success("修改密码成功");
    // 退出登录
    await useLogout();
  });
};
definePageMeta({
  title: "修改密码",
});
</script>
<style>
</style>