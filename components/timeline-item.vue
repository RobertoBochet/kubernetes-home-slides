<script setup lang="ts">
const props = defineProps({
  date: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div class="timeline-item">
    <!-- first, so that the dot paints over its start -->
    <span class="connector" aria-hidden="true" />
    <span class="dot" aria-hidden="true" />
    <div class="label">
      <div class="date">{{ props.date }}</div>
      <div class="subject"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  @apply relative flex items-center;
  min-height: 0;

  .dot {
    @apply absolute rounded-full;
    left: 0;
    top: 50%;
    translate: -50% -50%;
    width: 14px;
    height: 14px;
    background: var(--slidev-theme-primary);
    transition: scale 0.25s ease;
  }

  .connector {
    @apply absolute;
    left: 0;
    top: 50%;
    width: 49px;
    height: 1px;
    background: var(--slidev-theme-hairline-color);
    transform-origin: left center;
    transition: transform 0.25s ease;
  }

  .label {
    /* runs to the end of the row, so the text wraps where the layout's side slot begins */
    margin-left: 59px;
    transition: translate 0.25s ease;
  }

  /* the framework's fade is 0.1s: shorter than the movement it has to cover */
  &.slidev-vclick-target {
    transition: opacity 0.25s ease;
  }

  .date {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--slidev-theme-text-secondary-color);
  }

  .subject {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.25;
  }

  /* scoped styles do not reach the slot: `:deep()` is deliberate */
  .subject :deep(p) {
    margin: 0;
  }
}

/* While hidden, the parts already sit at the start of the gesture. */
.timeline-item.slidev-vclick-hidden {
  .label {
    translate: -14px 0;
  }

  .dot {
    scale: 0.35;
  }

  .connector {
    transform: scaleX(0);
  }
}
</style>
