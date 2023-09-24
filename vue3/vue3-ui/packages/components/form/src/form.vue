<template>
  <form :class="[bem.b()]">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { createNamespace } from '@zi-shui/utils/create'
import { provide } from 'vue'
import { FormContext, formContextKey, formEmits, formProps } from './form'
import {
  FormItemContext,
  ValidateFieldsError,
  ValidateError
} from './form-item'
const bem = createNamespace('form')

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const feilds: FormItemContext[] = []
const addFiled: FormContext['addFiled'] = formItem => {
  feilds.push(formItem)
}

const validate = async (
  callback?: (valid: boolean, fileds?: ValidateFieldsError) => void
) => {
  let errors = {} as ValidateFieldsError

  for (const field of feilds) {
    try {
      await field.validate('')
    } catch (e) {
      errors = {
        ...errors,
        ...(e as ValidateError).fields
      }
    }
  }
  if (Object.keys(errors).length == 0) return callback?.(true)
  callback?.(false, errors)
}

const context: FormContext = {
  ...props,
  addFiled,
  emit // 我将自己的触发逻辑交给你
}
provide(formContextKey, context)

defineOptions({
  name: 'ZForm'
})

// form组件也要提供一个validate方法 此方法就是校验 所有formItem

defineExpose({
  validate
})
</script>
