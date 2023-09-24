<template>
  <div :class="[bem.b()]">
    <label :class="[bem.e('label')]">
      <slot name="label">{{ label }}</slot>
    </label>

    <div :class="bem.e('content')">
      <slot />
      <div v-if="showError">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@zi-shui/utils/create'
import {
  FormItemContext,
  formItemProps,
  ValidateStates,
  formItemContextKey,
  Arrayable,
  FormItemRule,
  ValidateError
} from './form-item'
import { ref, computed, provide, inject, onMounted } from 'vue'
import AsyncValidator from 'async-validator'
import { formContextKey } from './form'

const formContext = inject(formContextKey)

const validateState = ref<ValidateStates>('')
const validateMessage = ref('')
const showError = computed(() => {
  // 需要显示 并且有错误的时候 显示error
  return (
    props.showMessage &&
    validateState.value === 'error' &&
    formContext?.showMessage
  )
})

function convertArray(rules: Arrayable<FormItemRule> | undefined) {
  if (rules) {
    if (Array.isArray(rules)) {
      return rules
    } else {
      return [rules]
    }
  } else {
    return []
  }
}
const props = defineProps(formItemProps)
const _rules = computed(() => {
  // 计算当前的规则
  const myRules: FormItemRule[] = convertArray(props.rules)
  const parentRules = formContext?.rules

  if (parentRules && props.prop) {
    // 找到父亲对应当前字段的规则
    const currenRules = parentRules[props.prop]
    if (currenRules) {
      myRules.push(...currenRules)
    }
  }
  return myRules
})

function filterRules(trigger: string) {
  const rules = _rules.value
  // change  blur  ''
  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true // 没有tigger的时候 就是全部条件出发
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

// 校验成功
const triggerFormValidate = (isValid: boolean, message = '') => {
  formContext?.emit('validate', props.prop!, isValid, message)
}
const onValidationSuccessded = (state: ValidateStates) => {
  validateState.value = state
  validateMessage.value = ''
  triggerFormValidate(true)
}
const onValidationFailed = (err: ValidateError) => {
  const errors = err.errors
  validateState.value = errors.length == 0 ? 'success' : 'error'
  validateMessage.value = errors[0].message || ''
  triggerFormValidate(false, errors[0].message)
}
const validate = async (trigger: string) => {
  // 这个方法是一个校验方法，当输入框输入内容的时候 会触发校验
  // 触发方式  需要根据触发方式获得对用的规则， 有了规则后 ， 在拿到校验的值 就可以校验了

  const rules = filterRules(trigger)
  const modelName = String(props.prop || '')
  const model = formContext?.model
  if (model && props.prop) {
    const validator = new AsyncValidator({
      // 创建一个骨架规则 schema
      [modelName]: rules
    })

    return validator
      .validate({
        // 校验属性根据值来校验
        [modelName]: model[modelName]
      })
      .then(() => {
        onValidationSuccessded('success')
      })
      .catch((err: ValidateError) => {
        onValidationFailed(err)
        return Promise.reject(err)
      })
  }

  // 父亲的数据和规则   tigger  props.prop  props.rule
  formContext?.model // 父亲提供的数据源
  formContext?.rules // 父亲的规则
  props.prop //这个是要校验的属性
  props.rules // 自己的校验规则
}

const context: FormItemContext = {
  ...props, // props 传递后会百年城非响应式
  validate
}
provide(formItemContextKey, context)

defineOptions({
  name: 'ZFormItem'
})

const bem = createNamespace('form-item')

onMounted(() => {
  formContext?.addFiled(context) // 让父组件收集子组件
})
</script>
