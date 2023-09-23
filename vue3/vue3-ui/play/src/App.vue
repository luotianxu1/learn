<template>
  <ZIcon size="20" ref="IconInstance">
    <Accessibility></Accessibility>
  </ZIcon>
</template>
<script setup lang="ts">
import { Accessibility } from '@vicons/ionicons5'
import { ref } from 'vue'
import { IconInstance } from '@zi-shui/components/icon'

const IconInstance = ref<IconInstance>()
</script>
<style scoped lang="scss"></style>
