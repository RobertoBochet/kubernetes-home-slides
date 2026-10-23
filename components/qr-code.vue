<script lang="ts" setup>
import QRCode from "qrcode.vue"
import { computed } from "vue"

const { value: _value } = defineProps({
  value: {
    type: String,
    required: false
  }
})

const currentUrl = computed(() => window.location.href.replace(/\/[0-9]+$/, ""))

const value = computed(() => _value ?? currentUrl.value)
const isValueUrl = computed(() => URL.canParse(value.value))
</script>

<template>
  <div class="slides-qr-code">
    <a
      :href="isValueUrl ? value : undefined"
      :aria-label="isValueUrl ? value : undefined"
      target="_blank"
      class="slides-qr-code__link"
    >
      <QRCode :value="value" render-as="svg" class="slides-qr-code__svg" />
    </a>
  </div>
</template>

<style scoped>
.slides-qr-code {
  @apply w-30%;

  &__link {
    @apply block w-full h-full border-none!;
  }

  &__svg {
    @apply w-full h-full;

    :deep(rect) {
      @apply fill-none;
    }

    :deep(path) {
      fill: var(--slidev-qrcode-color, var(--slidev-theme-text-color));
    }
  }
}
</style>
