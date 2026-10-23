import type { ComponentPublicInstance } from "vue"

export interface DiagramArrowExpose {
  createTimeline: (duration?: number) => gsap.core.Timeline
}
export interface DiagramArrowInstance extends DiagramArrowExpose, ComponentPublicInstance {
  $el: SVGSVGElement
}

export interface DiagramItemInstance extends ComponentPublicInstance {
  $el: HTMLElement
}
