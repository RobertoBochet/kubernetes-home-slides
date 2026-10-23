<script setup lang="ts">
import { onSlideLeave } from "@slidev/client"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { computed, nextTick, ref, watchEffect } from "vue"
import { resolveAssetUrl } from "@slidev/theme-default/layoutHelper.ts"

gsap.registerPlugin(Flip)

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ""
  },
  imageClass: {
    type: String,
    default: ""
  },
  disableZoom: {
    type: Boolean,
    default: false
  },
  animationDuration: {
    type: Number,
    default: 0.25
  }
})

const expanded = ref(false)
const cardPicture = ref<HTMLImageElement>()
const zoomPicture = ref<HTMLImageElement>()
const backdrop = ref<HTMLElement>()

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

const open = async () => {
  if (props.disableZoom) return

  const _cardPicture = cardPicture.value
  if (!_cardPicture) return

  const flipState = Flip.getState(_cardPicture)

  expanded.value = true
  await nextTick()

  if (prefersReducedMotion()) return

  const _zoomPicture = zoomPicture.value
  const _backdrop = backdrop.value
  if (!_zoomPicture || !_backdrop) return

  Flip.fit(_zoomPicture, flipState, { scale: true })
  void gsap.to(_zoomPicture, {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    skewX: 0,
    duration: props.animationDuration,
    ease: "none",
    clearProps: "transform"
  })
  void gsap.from(_backdrop, { "--dim": 0, duration: props.animationDuration, ease: "none", clearProps: "--dim" })
}

const close = () => {
  expanded.value = false
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") close()
}

const src = computed(() => resolveAssetUrl(props.src))

watchEffect(onCleanup => {
  if (!expanded.value) return

  window.addEventListener("keydown", onKey)
  onCleanup(() => {
    window.removeEventListener("keydown", onKey)
  })
})

onSlideLeave(close)
</script>

<template>
  <figure class="image-card">
    <img
      ref="cardPicture"
      class="image-card__picture"
      :class="[props.imageClass, { 'image-card__picture--zoomable': !props.disableZoom }]"
      :src="src"
      :alt="props.alt"
      @click.stop="open"
    />
    <figcaption class="image-card__caption">
      <slot />
    </figcaption>

    <Teleport to="body">
      <div
        v-if="expanded"
        ref="backdrop"
        class="image-card__backdrop"
        role="dialog"
        :aria-label="props.alt || undefined"
        @click.stop="close"
      >
        <img ref="zoomPicture" class="image-card__zoom-picture" :src="src" :alt="props.alt" />
        <div class="image-card__zoom-caption">
          <slot v-if="$slots['full-caption']" name="full-caption" />
          <slot v-else />
        </div>
      </div>
    </Teleport>
  </figure>
</template>

<style scoped>
.image-card {
  @apply rounded-md;

  background: var(--slidev-theme-background-color);
  border-color: var(--slidev-theme-hairline-color);
  border-width: 1px;
  border-style: solid;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:has(&__picture--zoomable:hover) {
    scale: 1.02;
  }

  &__picture {
    @apply block w-full h-auto;

    border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;

    &--zoomable {
      transition: scale 0.2s ease;
      cursor: zoom-in;
    }
  }

  &__caption {
    padding: 0.4rem 0.6rem;
    font-size: 0.7rem;
    line-height: 1.3;

    &:empty {
      display: none;
    }

    & :deep(p) {
      margin: 0;
      line-height: 1.3;
    }
  }

  &__backdrop {
    --zoom-max-width: 80vw;
    --zoom-max-height: 80vh;
    --dim: 1;

    position: fixed;
    inset: 0;
    z-index: 100;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-content: safe center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: color-mix(in srgb, var(--slidev-theme-background-color) calc(var(--dim) * 92%), transparent);
  }

  &__zoom-picture {
    flex: none;
    max-width: var(--zoom-max-width);
    max-height: var(--zoom-max-height);
    width: auto;
    height: auto;
    border-radius: 0.375rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  &__zoom-caption {
    flex: none;
    max-width: 60ch;
    font-size: 1.2rem;
    text-align: center;
    opacity: var(--dim);

    &:empty {
      display: none;
    }

    & :deep(p) {
      margin: 0;
      line-height: 1.3;
    }
  }
}
</style>
