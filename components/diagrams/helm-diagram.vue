<script setup lang="ts">
import { useTemplateRef } from "vue"
import CarbonDocumentMultiple01 from "~icons/carbon/document-multiple-01"
import CarbonKubernetes from "~icons/carbon/kubernetes"
import { diagramProps, resolveRefs, setupDiagram } from "../utilities"
import DiagramArrow from "./components/diagram-arrow.vue"
import { DiagramArrowInstance, DiagramItemInstance } from "../types/diagram.ts"
import DiagramBox from "./components/diagram-box.vue"
import DiagramItem from "./components/diagram-item.vue"

const props = defineProps(diagramProps)

const refs = {
  chart: useTemplateRef<DiagramItemInstance>("chart"),
  values: useTemplateRef<DiagramItemInstance>("values"),
  command: useTemplateRef<HTMLElement>("command"),
  chartArrow: useTemplateRef<DiagramArrowInstance>("chartArrow"),
  valuesArrow: useTemplateRef<DiagramArrowInstance>("valuesArrow"),
  boxArrow: useTemplateRef<DiagramArrowInstance>("boxArrow"),
  crd1: useTemplateRef<DiagramItemInstance>("crd1"),
  crd2: useTemplateRef<DiagramItemInstance>("crd2"),
  svc1: useTemplateRef<DiagramItemInstance>("svc1"),
  cert1: useTemplateRef<DiagramItemInstance>("cert1"),
  secret1: useTemplateRef<DiagramItemInstance>("secret1")
}

const POP_FROM = { opacity: 0, scale: 0.82 }
const POP_IN = { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(1.6)" }
const BURST = { ...POP_IN, duration: 0.2, stagger: 0.1 }

const ANIMATION_LABELS = ["idle", "chart", "values", "command"] as const

setupDiagram({
  name: "helm-diagram",
  animationLabels: ANIMATION_LABELS,
  props,
  timeline: tl => {
    const parts = resolveRefs(refs)
    if (!parts) return

    const { chart, values, command, chartArrow, valuesArrow, boxArrow } = parts
    const resources = [parts.crd1, parts.crd2, parts.svc1, parts.cert1, parts.secret1].map(r => r.$el)

    tl.addLabel("idle", 0)

      .fromTo(chart.$el, POP_FROM, POP_IN, "idle+=0.2")
      .addLabel("chart", ">0.15")

      .fromTo(values.$el, POP_FROM, POP_IN, "chart+=0.1")
      .addLabel("values", ">0.15")

      .to([chartArrow.$el, valuesArrow.$el], { opacity: 1, duration: 0.1, ease: "none" }, "values")
      .add(chartArrow.createTimeline(), "values")
      .add(valuesArrow.createTimeline(), "values")
      .fromTo(command, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, "values+=0.2")
      .to(boxArrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, "values+=0.35")
      .add(boxArrow.createTimeline(), "values+=0.35")
      .fromTo(resources, POP_FROM, BURST, "values+=0.7")
      .addLabel("command", ">0.15")
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="flex flex-col items-center w-[230px]">
      <div class="grid grid-cols-2 w-[300px]">
        <DiagramItem ref="chart" :icon="CarbonDocumentMultiple01" class="opacity-0">chart.tgz</DiagramItem>
        <DiagramItem ref="values" class="opacity-0">values.yaml</DiagramItem>
      </div>

      <!-- both inputs feed the command: one curved shaft each, vertical at both ends -->
      <div class="relative w-full h-16">
        <DiagramArrow
          ref="chartArrow"
          dashed
          class="top-0 left-[calc(50%_-_0.5px)] opacity-0"
          d="M-75 0C-75 28 -14 28 -14 56"
        />
        <DiagramArrow
          ref="valuesArrow"
          dashed
          class="top-0 left-[calc(50%_-_0.5px)] opacity-0"
          d="M75 0C75 28 14 28 14 56"
        />
      </div>

      <code ref="command" class="px-2 py-px rounded text-[0.7em] whitespace-nowrap opacity-0">helm install</code>

      <div class="relative w-full h-[67px]">
        <DiagramArrow ref="boxArrow" class="top-0 left-[calc(50%_-_0.5px)] opacity-0" d="M0 8V59" />
      </div>

      <DiagramBox :icon="CarbonKubernetes" label="kubernetes" class="w-[230px] flex-col gap-2 pt-10! pb-4!">
        <div class="flex items-center">
          <DiagramItem ref="crd1" class="opacity-0">crd1</DiagramItem>
          <DiagramItem ref="crd2" class="opacity-0">crd2</DiagramItem>
          <DiagramItem ref="svc1" class="opacity-0">svc1</DiagramItem>
        </div>
        <div class="flex items-center">
          <DiagramItem ref="cert1" class="opacity-0">cert1</DiagramItem>
          <DiagramItem ref="secret1" class="opacity-0">secret1</DiagramItem>
        </div>
      </DiagramBox>
    </div>
  </div>
</template>
