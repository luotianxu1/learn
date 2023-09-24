<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled || loading)
    ]"
    :type="nativeType"
    :disabled="disabled"
    @click="handleClick"
    @mousedown="handleMousedown"
  >
    <!-- 如果有逻辑性的模板建议使用tsx -->
    <template v-if="iconPlacement === 'left'">
      <loading-component v-if="loading"></loading-component>
      <template v-else-if="slots.icon">
        <Component :is="slots.icon"></Component>
      </template>
    </template>

    <slot></slot>

    <template v-if="iconPlacement === 'right'">
      <loading-component v-if="loading"></loading-component>
      <template v-else-if="slots.icon">
        <Component :is="slots.icon"></Component>
      </template>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { createNamespace } from '@zi-shui/utils/create'
import { useSlots } from 'vue'
import { buttonEmits, buttonProps } from './button'
import LoadingComponent from './loading.vue'

// unplugin-vue-define-Optuons
defineOptions({
  name: 'ZButton',
  inheritAttrs: false // 会被放到attrs,不会放到dom上
})

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = useSlots()

const bem = createNamespace('button')
const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
const handleMousedown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>
