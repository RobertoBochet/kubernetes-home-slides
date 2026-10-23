<script setup lang="ts">
import { useTemplateRef } from "vue"
import CarbonCheckmark from "~icons/carbon/checkmark"
import CarbonDb2Database from "~icons/carbon/db2-database"
import CarbonEdit from "~icons/carbon/edit"
import CarbonKubernetes from "~icons/carbon/kubernetes"
import CarbonKubernetesPod from "~icons/carbon/kubernetes-pod"
import CarbonLaptop from "~icons/carbon/laptop"
import CarbonRenew from "~icons/carbon/renew"
import CarbonView from "~icons/carbon/view"
import { diagramProps, resolveRefs, setupDiagram } from "../utilities"
import DiagramArrow from "./components/diagram-arrow.vue"
import { DiagramArrowInstance, DiagramItemInstance } from "../types/diagram.ts"
import DiagramBox from "./components/diagram-box.vue"
import DiagramItem from "./components/diagram-item.vue"

const props = defineProps(diagramProps)

const refs = {
  readResources: useTemplateRef<DiagramArrowInstance>("readResources"),
  readNode: useTemplateRef<DiagramArrowInstance>("readNode"),
  createPod: useTemplateRef<DiagramArrowInstance>("createPod"),
  writeStatus: useTemplateRef<DiagramArrowInstance>("writeStatus"),
  readResourcesIcon: useTemplateRef<HTMLElement>("readResourcesIcon"),
  readNodeIcon: useTemplateRef<HTMLElement>("readNodeIcon"),
  createPodIcon: useTemplateRef<HTMLElement>("createPodIcon"),
  writeStatusIcon: useTemplateRef<HTMLElement>("writeStatusIcon"),
  pod1: useTemplateRef<DiagramItemInstance>("pod1"),
  pod2: useTemplateRef<DiagramItemInstance>("pod2"),
  nodePod1: useTemplateRef<DiagramItemInstance>("nodePod1"),
  nodePod2: useTemplateRef<DiagramItemInstance>("nodePod2"),
  checkMark: useTemplateRef<HTMLElement>("checkMark")
}

const ANIMATION_LABELS = ["idle", "watch", "check", "create", "report"] as const

setupDiagram({
  name: "control-loop-diagram",
  animationLabels: ANIMATION_LABELS,
  props,
  timeline: tl => {
    const parts = resolveRefs(refs)
    if (!parts) return

    const { readResources, readNode, createPod, writeStatus, checkMark } = parts
    const { readResourcesIcon, readNodeIcon, createPodIcon, writeStatusIcon } = parts
    const { pod1, pod2, nodePod1, nodePod2 } = parts

    tl.addLabel("idle", 0)
      .set([readResources.$el, readResourcesIcon], { opacity: 0 })
      .set([readNode.$el, readNodeIcon], { opacity: 0 })
      .set([createPod.$el, createPodIcon], { opacity: 0 })
      .set([writeStatus.$el, writeStatusIcon], { opacity: 0 })

      .to(readResources.$el, { opacity: 1, duration: 0.1, ease: "none" }, "idle")
      .add(readResources.createTimeline(), "idle")
      .to(readResourcesIcon, { opacity: 1, duration: 0.2, ease: "none" }, "idle+=0.2")
      .to([pod1.$el, pod2.$el], { opacity: 1, duration: 0.3, ease: "none" }, "idle+=0.3")
      .addLabel("watch", ">0.15")

      .to(readNode.$el, { opacity: 1, duration: 0.1, ease: "none" }, "watch")
      .add(readNode.createTimeline(), "watch")
      .to(readNodeIcon, { opacity: 1, duration: 0.2, ease: "none" }, "watch+=0.2")
      .addLabel("check", ">0.15")

      .to(createPod.$el, { opacity: 1, duration: 0.1, ease: "none" }, "check")
      .add(createPod.createTimeline(), "check")
      .to(createPodIcon, { opacity: 1, duration: 0.2, ease: "none" }, "check+=0.2")
      // pod2 holds its slot while invisible, so pod1 sits half a pitch off centre: written, not measured
      .fromTo(nodePod1.$el, { x: 24.5 }, { x: 0, duration: 0.25, ease: "none" }, "check+=0.3")
      .to(nodePod2.$el, { opacity: 1, duration: 0.25, ease: "none" }, "check+=0.3")
      .addLabel("create", ">0.15")

      .to(writeStatus.$el, { opacity: 1, duration: 0.1, ease: "none" }, "create")
      .add(writeStatus.createTimeline(), "create")
      .to(writeStatusIcon, { opacity: 1, duration: 0.2, ease: "none" }, "create+=0.2")
      .to(checkMark, { opacity: 1, duration: 0.2, ease: "none" }, "create+=0.3")
      .addLabel("report", ">0.1")
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="flex flex-col items-center gap-12 w-full">
      <DiagramBox :icon="CarbonKubernetes" label="kubernetes" class="w-[220px] flex-col gap-14 pt-10! pb-2!">
        <DiagramBox :icon="CarbonDb2Database" label="resources" class="w-[160px] flex-wrap rounded-[8px]!">
          <DiagramItem ref="pod1" class="opacity-50">pod1</DiagramItem>
          <DiagramItem ref="pod2" class="opacity-50">
            pod2
            <template #overlay>
              <span ref="checkMark" class="absolute color-green text-4 -top-1.5 -right-2.5 opacity-0">
                <CarbonCheckmark />
              </span>
            </template>
          </DiagramItem>
          <DiagramItem class="opacity-50">ns1</DiagramItem>
          <DiagramArrow ref="readResources" dashed class="bottom-0 left-[calc(50%_-_0.5px)]" d="M-14 55V5" />
          <DiagramArrow ref="writeStatus" class="bottom-0 left-[calc(50%_-_0.5px)]" d="M14 55V5" />
          <span
            ref="readResourcesIcon"
            class="absolute flex leading-none left-[calc(50%_-_40px)] bottom-[-35px] opacity-0"
          >
            <CarbonView class="text-2.5 color-primary" />
          </span>
          <span
            ref="writeStatusIcon"
            class="absolute flex leading-none left-[calc(50%_+_28px)] bottom-[-35px] opacity-0"
          >
            <CarbonEdit class="text-2.5 color-primary" />
          </span>
        </DiagramBox>

        <div class="flex items-center gap-1.5 h-[34px] px-2 border border-hairline rounded-lg text-[0.8em]">
          <CarbonRenew class="w-3.5 h-3.5 color-primary" />
          <span>controller</span>
        </div>
      </DiagramBox>

      <DiagramBox :icon="CarbonLaptop" label="node" class="w-[220px]">
        <DiagramItem ref="nodePod1" :icon="CarbonKubernetesPod">pod1</DiagramItem>
        <DiagramItem ref="nodePod2" :icon="CarbonKubernetesPod" class="opacity-0">pod2</DiagramItem>
        <DiagramArrow ref="readNode" dashed class="top-0 left-[calc(50%_-_0.5px)]" d="M-14 -55V-4" />
        <DiagramArrow ref="createPod" class="top-0 left-[calc(50%_-_0.5px)]" d="M14 -55V-4" />
        <span ref="readNodeIcon" class="absolute flex leading-none left-[calc(50%_-_40px)] top-[-35px] opacity-0">
          <CarbonView class="text-2.5 color-primary" />
        </span>
        <span ref="createPodIcon" class="absolute flex leading-none left-[calc(50%_+_28px)] top-[-35px] opacity-0">
          <CarbonEdit class="text-2.5 color-primary" />
        </span>
      </DiagramBox>
    </div>
  </div>
</template>
