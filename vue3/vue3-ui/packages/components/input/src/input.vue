<template>
  <div :class="[bem.b(), bem.b('group')]">
    <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
      <slot name="prepend"></slot>
    </div>

    <div :class="bem.e('wrapper')">
      <div v-if="slots.prefix" :class="bem.e('prefix')">
        <slot name="prefix"></slot>
      </div>

      <input
        ref="input"
        :type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :class="bem.e('inner')"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="slots.suffix" :class="bem.e('suffix')">
        <slot name="suffix"> </slot>
      </div>
      <template v-if="showPwdVisible">
        <z-icon @click="handlePassword">
          <span v-if="pwdVisible">隐</span>
          <span v-else>显</span>
        </z-icon>
      </template>
      <template v-if="showClearVisible">
        <z-icon @click="handleClear">
          <span>清</span>
        </z-icon>
      </template>
    </div>

    <div v-if="slots.append" :class="bem.be('group', 'append')">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@zi-shui/utils/create'
import { useSlots, computed, ref, nextTick, inject, watch } from 'vue'
import { formItemContextKey } from '../../form'
import { inputEmits, inputProps, InputEmits } from './input'

const formItemContext = inject(formItemContextKey)

watch(
  () => props.modelValue,
  () => {
    formItemContext?.validate('change').catch(e => {
      console.log(e)
    })
  }
)

defineOptions({
  name: 'ZInput'
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const bem = createNamespace('input')

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value)
}
const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('change', value)
}
const pwdVisible = ref(false)
if (props.type === 'password' && props.showPassword) {
  pwdVisible.value = true
}
const showPwdVisible = computed(() => {
  //是否显示 显示密码
  return (
    props.showPassword && props.modelValue && !props.disabled && !props.readonly
  )
})
const showClearVisible = computed(() => {
  return (
    props.clearable && props.modelValue && !props.disabled && !props.readonly
  )
})
const handlePassword = () => {
  pwdVisible.value = !pwdVisible.value
  focus()
}
const input = ref<HTMLInputElement>()
const focus = async () => {
  await nextTick()
  input.value?.focus()
}
const handleClear: InputEmits['clear'] = () => {
  emit('clear')
  emit('update:modelValue', '')
  emit('change', '')
  return true
}
const handleFocus: InputEmits['focus'] = e => {
  emit('focus', e)
  return true
}
const handleBlur: InputEmits['blur'] = e => {
  emit('blur', e)

  formItemContext?.validate('blur').catch(e => {
    console.log(e)
  })
  return true
}
</script>
