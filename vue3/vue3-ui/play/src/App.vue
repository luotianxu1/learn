<template>
  <z-button
    size="large"
    type="primary"
    :round="true"
    icon-placement="right"
    :loading="true"
  >
    <z-icon size="20" ref="IconInstanceRef">
      <Accessibility></Accessibility>
    </z-icon>
    <span>Button</span>
  </z-button>
</template>
<script setup lang="ts">
import { Accessibility } from '@vicons/ionicons5'
import { ref } from 'vue'
import { IconInstance } from '@zi-shui/components/icon'

const IconInstanceRef = ref<IconInstance>()
</script>
<style scoped lang="scss"></style>
