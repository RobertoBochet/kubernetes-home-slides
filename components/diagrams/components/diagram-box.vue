<script setup lang="ts">
import { type Component, type PropType } from "vue"

const { icon, label } = defineProps({
  icon: { type: Object as PropType<Component> },
  label: { type: String }
})
</script>

<template>
  <div
    class="diagram-box relative rounded-[10px] flex justify-center items-center p-2 border-1 border-hairline border-dashed"
    :class="icon && label ? ['pt-8'] : []"
  >
    <div v-if="icon && label" class="absolute top-1.5 left-1.5 flex items-center gap-1 text-xs color-secondary">
      <component :is="icon" />
      <span>{{ label }}</span>
    </div>
    <slot />
  </div>
</template>
