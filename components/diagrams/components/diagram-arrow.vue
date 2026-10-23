<script setup lang="ts">
import { gsap } from "gsap"
import { useId, useTemplateRef } from "vue"
import { resolveRefs } from "../../utilities"
import { DiagramArrowExpose } from "../../types/diagram.ts"

const { d, dashed, double } = defineProps({
  d: { type: String, required: true },
  dashed: { type: Boolean, default: false },
  double: { type: Boolean, default: false }
})

const uid = useId()
const headId = `diagram-head-${uid}`
const maskId = `diagram-mask-${uid}`

const refs = {
  shaft: useTemplateRef<SVGPathElement>("shaft"),
  mask: useTemplateRef<SVGPathElement>("mask"),
  head: useTemplateRef<SVGPathElement>("head")
}

defineExpose<DiagramArrowExpose>({
  createTimeline: (duration = 0.3) => {
    const targets = resolveRefs(refs)
    if (!targets) return gsap.timeline()

    return gsap
      .timeline()
      .fromTo(targets.head, { opacity: 0 }, { opacity: 1, duration: 0.1 }, Math.max(0, duration - 0.1))
      .fromTo(
        targets.mask,
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration, ease: "none" },
        0
      )
  }
})
</script>

<template>
  <svg
    class="diagram-arrow absolute w-px h-px overflow-visible pointer-events-none fill-none stroke-primary stroke-2"
    viewBox="0 0 1 1"
    aria-hidden="true"
  >
    <defs>
      <marker
        :id="headId"
        viewBox="-1 -1 14 14"
        refX="10"
        refY="6"
        markerWidth="14"
        markerHeight="14"
        markerUnits="userSpaceOnUse"
        orient="auto-start-reverse"
      >
        <path ref="head" class="stroke-2 stroke-cap-round" d="M3 0 L10 6 L3 12" />
      </marker>
      <mask :id="maskId" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width="2000" height="2000">
        <path ref="mask" class="stroke-white stroke-16 stroke-cap-round" :d="d" pathLength="100" />
      </mask>
    </defs>
    <path
      ref="shaft"
      class="stroke-cap-auto"
      :class="dashed ? [`stroke-dash-4`] : []"
      :d="d"
      :mask="`url(#${maskId})`"
      :marker-start="double ? `url(#${headId})` : undefined"
      :marker-end="`url(#${headId})`"
    />
  </svg>
</template>
