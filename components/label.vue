<script setup lang="ts">
import { computed, PropType } from "vue"

type LabelColor = "blue" | "orange" | "red" | "green" | "gray"

const { color } = defineProps({
  color: {
    type: String as PropType<LabelColor>,
    default: "gray"
  }
})

const colorClass = computed(() => `label--${color}`)
</script>

<template>
  <span :class="['label', colorClass]">
    <slot></slot>
  </span>
</template>

<style scoped>
.label {
  display: inline-block;
  padding: 0 0.3em;
  border-radius: 3px;
  font-size: 0.8em;
  font-weight: 600;
  vertical-align: baseline;
  margin: 0 2px;
  line-height: 1.2;
  border: none;
  color: inherit;

  &--blue {
    background-color: light-dark(theme("colors.blue.500"), theme("colors.blue.600"));
  }
  &--orange {
    background-color: light-dark(theme("colors.orange.500"), theme("colors.orange.600"));
  }
  &--red {
    background-color: light-dark(theme("colors.red.500"), theme("colors.red.600"));
  }
  &--green {
    background-color: light-dark(theme("colors.green.500"), theme("colors.green.600"));
  }
  &--gray {
    background-color: light-dark(theme("colors.gray.300"), theme("colors.gray.600"));
  }
}
</style>
