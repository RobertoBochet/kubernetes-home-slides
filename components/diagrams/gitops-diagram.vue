<script setup lang="ts">
import { gsap } from "gsap"
import { useTemplateRef } from "vue"
import ThesvgColorFlux from "~icons/thesvg-color/flux"
import ThesvgColorGit from "~icons/thesvg-color/git"
import CarbonClose from "~icons/carbon/close"
import CarbonEdit from "~icons/carbon/edit"
import CarbonKubernetes from "~icons/carbon/kubernetes"
import CarbonView from "~icons/carbon/view"
import { diagramProps, resolveRefs, setupDiagram } from "../utilities"
import DiagramArrow from "./components/diagram-arrow.vue"
import { DiagramArrowInstance, DiagramItemInstance } from "../types/diagram.ts"
import DiagramBox from "./components/diagram-box.vue"
import DiagramItem from "./components/diagram-item.vue"

const props = defineProps(diagramProps)

const refs = {
  commands: useTemplateRef<HTMLElement>("commands"),
  commandsArrow: useTemplateRef<DiagramArrowInstance>("commandsArrow"),
  repoArrow: useTemplateRef<DiagramArrowInstance>("repoArrow"),
  repoIcon: useTemplateRef<HTMLElement>("repoIcon"),
  readArrow: useTemplateRef<DiagramArrowInstance>("readArrow"),
  writeArrow: useTemplateRef<DiagramArrowInstance>("writeArrow"),
  readIcon: useTemplateRef<HTMLElement>("readIcon"),
  writeIcon: useTemplateRef<HTMLElement>("writeIcon"),
  deploy1: useTemplateRef<DiagramItemInstance>("deploy1"),
  cross: useTemplateRef<HTMLElement>("cross"),
  svc1: useTemplateRef<DiagramItemInstance>("svc1"),
  svc2: useTemplateRef<DiagramItemInstance>("svc2"),
  pvc1: useTemplateRef<DiagramItemInstance>("pvc1"),
  role1: useTemplateRef<DiagramItemInstance>("role1"),
  sa1: useTemplateRef<DiagramItemInstance>("sa1")
}

const POP_FROM = { opacity: 0, scale: 0.82 }
const POP_IN = { opacity: 1, scale: 1, duration: 0.26, ease: "back.out(1.6)" }
const FADE_OUT = { opacity: 0, scale: 0.86, duration: 0.24, ease: "power2.in" }
const ALONE_OFFSET = 64
const PAIR_OFFSET = -32

const ANIMATION_LABELS = ["idle", "complete"] as const

setupDiagram({
  name: "gitops-diagram",
  animationLabels: ANIMATION_LABELS,
  props,
  timeline: tl => {
    const parts = resolveRefs(refs)
    if (!parts) return

    const { commands, commandsArrow, repoArrow, repoIcon } = parts
    const { readArrow, writeArrow, readIcon, writeIcon } = parts
    const { deploy1, cross, role1, sa1 } = parts
    const documents = [role1.$el, sa1.$el]
    gsap.set(deploy1.$el, { x: ALONE_OFFSET })
    const pairStart = { ...POP_FROM, x: PAIR_OFFSET }
    const pairEnd = { ...POP_IN, x: PAIR_OFFSET }

    tl.addLabel("idle", 0)

      .fromTo(commands, POP_FROM, POP_IN, "idle+=0.1")
      .to(commandsArrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, ">0.1")
      .add(commandsArrow.createTimeline(), "<")

      .to(repoArrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, ">0.15")
      .add(repoArrow.createTimeline(), "<")
      .to(repoIcon, { opacity: 1, duration: 0.2, ease: "none" }, "<0.15")

      .to(readArrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, ">0.1")
      .add(readArrow.createTimeline(), "<")
      .to(readIcon, { opacity: 1, duration: 0.2, ease: "none" }, "<0.15")
      .to(writeArrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, ">0.25")
      .add(writeArrow.createTimeline(), "<")
      .to(writeIcon, { opacity: 1, duration: 0.2, ease: "none" }, "<0.15")

      .fromTo(cross, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2)" }, ">0.1")
      .to(deploy1.$el, FADE_OUT, ">0.45")

      .fromTo(documents, pairStart, { ...pairEnd, stagger: 0.1 }, ">0.15")
      .addLabel("complete", ">0.1")
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="flex flex-col items-center w-[230px]">
      <!-- one gesture, typed in one place: the line break is the order, not an arrow -->
      <code ref="commands" class="px-2.5 py-1 rounded text-[0.7em] leading-snug text-left opacity-0"
        >git commit<br />git push</code
      >

      <div class="relative w-full h-9">
        <DiagramArrow ref="commandsArrow" class="top-0 left-[calc(50%_-_0.5px)] opacity-0" d="M0 4V28" />
      </div>

      <ThesvgColorGit class="text-10" />
      <span class="mt-1 text-[0.7em] color-secondary">repository</span>

      <div class="relative w-full h-14">
        <DiagramArrow ref="repoArrow" dashed class="top-0 left-[calc(50%_-_0.5px)] opacity-0" d="M0 48V6" />
        <span ref="repoIcon" class="absolute flex leading-none left-[calc(50%_+_16px)] top-[22px] opacity-0">
          <CarbonView class="text-2.5 color-primary" />
        </span>
      </div>

      <div
        class="flex items-center justify-center w-[54px] h-[54px] rounded-full border-1 border-hairline bg-secondary"
      >
        <ThesvgColorFlux class="text-7" />
      </div>
      <span class="mt-1 text-[0.7em] color-secondary">CD controller</span>

      <div class="relative w-full h-[62px]">
        <DiagramArrow ref="readArrow" dashed class="top-0 left-[calc(50%_-_0.5px)] opacity-0" d="M-14 4V54" />
        <DiagramArrow ref="writeArrow" class="top-0 left-[calc(50%_-_0.5px)] opacity-0" d="M14 4V54" />
        <span ref="readIcon" class="absolute flex leading-none left-[calc(50%_-_40px)] top-[24px] opacity-0">
          <CarbonView class="text-2.5 color-primary" />
        </span>
        <span ref="writeIcon" class="absolute flex leading-none left-[calc(50%_+_28px)] top-[24px] opacity-0">
          <CarbonEdit class="text-2.5 color-primary" />
        </span>
      </div>

      <!-- the icon width is a layout parameter here: it decides how many documents fit on a line, so
      it belongs to the documents. On the box it would also stretch the mark of the label, which is a
      caption, not a resource -->
      <DiagramBox :icon="CarbonKubernetes" label="kubernetes" class="w-[230px] flex-col gap-2 flex-wrap flex-row!">
        <DiagramItem ref="svc1" class="w-10">svc1</DiagramItem>
        <DiagramItem ref="svc2" class="w-10">svc2</DiagramItem>
        <DiagramItem ref="pvc1" class="w-10">pvc1</DiagramItem>
        <DiagramItem ref="deploy1" class="w-10">
          deploy1
          <template #overlay>
            <span ref="cross" class="absolute flex -top-1.5 -right-2 color-red-600 text-[20px] opacity-0">
              <CarbonClose />
            </span>
          </template>
        </DiagramItem>
        <DiagramItem ref="role1" class="w-10 opacity-0">role1</DiagramItem>
        <DiagramItem ref="sa1" class="w-10 opacity-0">sa1</DiagramItem>
      </DiagramBox>
    </div>
  </div>
</template>
