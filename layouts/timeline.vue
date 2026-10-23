<script setup lang="ts">
const {
  class: _class,
  titleClass,
  asideClass
} = defineProps({
  class: {
    type: String,
    default: ""
  },
  titleClass: {
    type: String,
    default: ""
  },
  asideClass: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div class="slidev-layout timeline-layout w-full h-full">
    <div class="title" :class="titleClass">
      <slot name="title" />
    </div>

    <div class="timeline" :class="_class">
      <slot />
    </div>

    <div class="aside" :class="asideClass">
      <slot name="aside" />
    </div>
  </div>
</template>

<style scoped>
.timeline-layout {
  @apply relative flex overflow-hidden p-0;

  .title {
    @apply shrink-0;
    width: 25%;
    padding: 1.5rem 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    :deep(p) {
      margin: 0;
    }
  }

  .timeline {
    @apply relative grid h-full;
    grid-auto-rows: minmax(0, 1fr);
    flex: 0 1 auto;
    min-width: 0;

    /* the rail: a pseudo-element and not a border, which would push the entries 1px right */
    &::before {
      content: "";
      @apply absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--slidev-theme-hairline-color);
    }
  }

  .aside {
    flex: 1 1 0;
    min-width: 0;
    margin-block: 1.5rem;
    margin-right: 1.5rem;
    margin-left: 1.5rem;

    :deep(p) {
      margin: 0;
    }
  }
}
</style>
