<script setup lang="ts">
import CarbonDocument from "~icons/carbon/document"
import { type Component, type PropType } from "vue"

const { icon } = defineProps({
  icon: { type: Object as PropType<Component>, default: CarbonDocument }
})
</script>

<template>
  <div class="diagram-item flex flex-col items-center gap-[2px] text-[0.8em] whitespace-nowrap mx-2">
    <div class="relative flex items-center">
      <component :is="icon" class="text-[20px] w-[24px] color-primary" />
      <slot name="overlay" />
    </div>
    <span class="text-center line-height-tight"><slot /></span>
  </div>
</template>
