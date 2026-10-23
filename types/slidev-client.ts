import type { SlidevConfig } from "@slidev/types"
import type { Ref } from "vue"

export interface SlideContext {
  $clicks: Ref<number>
  $slidev: { configs: SlidevConfig }
  $nav: { nextSlide: () => void }
}

export declare function useSlideContext(): SlideContext
export declare function onSlideLeave(callback: () => void): void
