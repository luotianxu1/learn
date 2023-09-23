<template>
  <i :class="[bem.b()]" :style="style"> <slot></slot> </i>
</template>

<script lang="ts" setup>
import { createNamespace } from '@zi-shui/utils/create'
import { iconProps } from './icon'
import { computed, CSSProperties } from 'vue'

defineOptions({
  name: 'ZIcon'
})

const props = defineProps(iconProps)

const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}

  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})

const bem = createNamespace('icon')
</script>

<style lang="scss" scoped></style>
