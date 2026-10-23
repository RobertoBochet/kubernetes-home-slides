<script setup lang="ts">
import { useTemplateRef } from "vue"
import CarbonClose from "~icons/carbon/close"
import CarbonKubernetes from "~icons/carbon/kubernetes"
import CarbonKubernetesPod from "~icons/carbon/kubernetes-pod"
import CarbonLaptop from "~icons/carbon/laptop"
import { diagramProps, resolveRefs, setupDiagram } from "../utilities"
import DiagramArrow from "./components/diagram-arrow.vue"
import { DiagramArrowInstance, DiagramItemInstance } from "../types/diagram.ts"
import DiagramBox from "./components/diagram-box.vue"
import DiagramItem from "./components/diagram-item.vue"

const props = defineProps(diagramProps)

const refs = {
  command: useTemplateRef<HTMLElement>("command"),
  cross: useTemplateRef<HTMLElement>("cross"),
  doc1: useTemplateRef<DiagramItemInstance>("doc1"),
  doc2: useTemplateRef<DiagramItemInstance>("doc2"),
  doc3: useTemplateRef<DiagramItemInstance>("doc3"),
  pod1: useTemplateRef<DiagramItemInstance>("pod1"),
  pod2: useTemplateRef<DiagramItemInstance>("pod2"),
  pod3: useTemplateRef<DiagramItemInstance>("pod3"),
  ns: useTemplateRef<DiagramItemInstance>("ns"),
  svc1: useTemplateRef<DiagramItemInstance>("svc1"),
  svc2: useTemplateRef<DiagramItemInstance>("svc2"),
  clusterItems: useTemplateRef<HTMLElement>("clusterItems"),
  nodeItems: useTemplateRef<HTMLElement>("nodeItems"),
  flow: useTemplateRef<DiagramArrowInstance>("flow"),
  apply: useTemplateRef<DiagramArrowInstance>("apply")
}

const EASE = "power2.out"
const POP = "back.out(1.6)"
const POP_FROM = { opacity: 0, scale: 0.82 }
const POP_IN = { opacity: 1, scale: 1, duration: 0.28, ease: POP }
const FADE_OUT = { opacity: 0, scale: 0.86, duration: 0.24, ease: "power2.in" }
const ANIMATION_LABELS = ["idle", "declare", "run", "remove", "apply", "kinds"] as const

setupDiagram({
  name: "kubernetes-state-diagram",
  animationLabels: ANIMATION_LABELS,
  props,
  maxSeek: 1.6,
  timeline: tl => {
    const parts = resolveRefs(refs)
    if (!parts) return

    const { command, cross, doc1, doc2, doc3, pod1, pod2, pod3, ns, svc1, svc2 } = parts
    const { clusterItems, nodeItems, flow, apply } = parts

    const items = [doc1, doc2, doc3, pod1, pod2, pod3, ns, svc1, svc2].map(item => item.$el)
    const rows = [clusterItems, nodeItems]
    const SHIFT = 24.5

    tl.addLabel("idle", 0)
      .set(items, { opacity: 0, scale: 1 })
      .set([command, cross, flow.$el, apply.$el], { opacity: 0 })
      .set(rows, { x: 0 })

      .to(rows, { x: SHIFT, duration: 0.3, ease: EASE }, "idle+=0.5")
      .fromTo(doc1.$el, POP_FROM, POP_IN, "<")
      .fromTo(doc2.$el, POP_FROM, POP_IN, "<+=0.18")
      .addLabel("declare", ">0.1")

      .to(flow.$el, { opacity: 1, duration: 0 }, "declare")
      .add(flow.createTimeline(0.35), "declare")
      .fromTo(pod1.$el, POP_FROM, POP_IN, "declare+=0.18")
      .fromTo(pod2.$el, POP_FROM, POP_IN, "declare+=0.36")
      .addLabel("run", ">0.1")

      .fromTo(cross, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2)" }, "run")
      .to(doc1.$el, FADE_OUT, "run+=0.45")
      .to(clusterItems, { x: 0, duration: 0.3, ease: EASE }, "run+=0.72")
      .to(pod1.$el, FADE_OUT, "run+=1.05")
      .to(nodeItems, { x: 0, duration: 0.3, ease: EASE }, "run+=1.32")
      .addLabel("remove", ">0.1")

      .fromTo(command, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, ease: EASE }, "remove")
      .to(clusterItems, { x: -SHIFT, duration: 0.3, ease: EASE }, "remove+=0.41")
      .to(apply.$el, { opacity: 1, duration: 0 }, "remove+=0.41")
      .add(apply.createTimeline(), "remove+=0.41")
      .fromTo(doc3.$el, POP_FROM, POP_IN, "remove+=0.71")
      .to(nodeItems, { x: -SHIFT, duration: 0.3, ease: EASE }, "remove+=1.0")
      .fromTo(pod3.$el, POP_FROM, POP_IN, "remove+=1.30")
      .addLabel("apply", ">0.1")

      .fromTo(ns.$el, POP_FROM, POP_IN, "apply+=0.35")
      .fromTo(svc1.$el, POP_FROM, POP_IN, "apply+=0.47")
      .fromTo(svc2.$el, POP_FROM, POP_IN, "apply+=0.59")
      .addLabel("kinds", ">0.1")
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="relative flex flex-col items-center gap-12 w-full">
      <code
        ref="command"
        class="absolute -top-12 left-0 right-0 mx-auto w-fit px-1.5 py-px rounded text-[0.62em] whitespace-nowrap opacity-0"
        >kubectl apply -f pod3.yaml</code
      >

      <DiagramBox :icon="CarbonKubernetes" label="kubernetes" class="w-[230px] flex-col gap-2 pt-10! pb-4!">
        <div ref="clusterItems" class="flex items-center">
          <DiagramItem ref="doc1" class="opacity-0">
            pod1
            <template #overlay>
              <span ref="cross" class="absolute flex -top-1.5 -right-2 color-red-600 text-[20px] opacity-0">
                <CarbonClose />
              </span>
            </template>
          </DiagramItem>
          <DiagramItem ref="doc2" class="opacity-0">pod2</DiagramItem>
          <DiagramItem ref="doc3" class="opacity-0">pod3</DiagramItem>
        </div>

        <div class="flex items-center">
          <DiagramItem ref="ns" class="opacity-0">ns1</DiagramItem>
          <DiagramItem ref="svc1" class="opacity-0">svc1</DiagramItem>
          <DiagramItem ref="svc2" class="opacity-0">svc2</DiagramItem>
        </div>
        <DiagramArrow ref="apply" class="top-0 left-[calc(50%_-_0.5px)]" d="M0 -20C0 1.15 24.5 5.85 24.5 27" />
      </DiagramBox>

      <DiagramBox :icon="CarbonLaptop" label="node" class="w-[230px]">
        <div ref="nodeItems" class="flex items-center">
          <DiagramItem ref="pod1" :icon="CarbonKubernetesPod" class="opacity-0">pod1</DiagramItem>
          <DiagramItem ref="pod2" :icon="CarbonKubernetesPod" class="opacity-0">pod2</DiagramItem>
          <DiagramItem ref="pod3" :icon="CarbonKubernetesPod" class="opacity-0">pod3</DiagramItem>
        </div>
        <DiagramArrow ref="flow" dashed class="top-0 left-[calc(50%_-_0.5px)]" d="M0 -48V0" />
      </DiagramBox>
    </div>
  </div>
</template>
