<script setup lang="ts">
import { formInstance } from '@zi-shui/components/form'
import { ref, reactive } from 'vue'
const handleclick = () => {
  formEl.value?.validate((valid, fileds) => {
    console.log(valid, fileds)
  })
}
const state = reactive({
  username: '',
  password: ''
})
const formEl = ref<formInstance>()

const validate = (prop: string, isValid: boolean, message: string) => {
  // formItem 每次触发完毕后都要执行此方法
  console.log(prop, isValid, message)
}
</script>

<template>
  <z-form :model="state" ref="formEl" @validate="validate">
    <z-form-item
      label="请输用户名"
      prop="username"
      :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 6,
          message: '用户名是3-6位',
          trigger: ['blur', 'change']
        }
      ]"
    >
      <z-input type="text" v-model="state.username"> </z-input>
    </z-form-item>

    <z-form-item
      label="请输入密码"
      prop="password"
      :rules="[
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 6,
          message: '密码3-6位',
          trigger: ['blur', 'change']
        }
      ]"
    >
      <z-input type="text" v-model="state.password"> </z-input>
    </z-form-item>

    <z-form-item>
      <z-button
        size="large"
        type="primary"
        :round="true"
        icon-placement="right"
        @click="handleclick"
      >
        确认
      </z-button>
    </z-form-item></z-form
  >
</template>
