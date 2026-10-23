import { useSlideContext } from "@slidev/client"
import { gsap } from "gsap"
import { onMounted, type PropType, watch } from "vue"

export const diagramProps = {
  at: { type: [String, Number] as PropType<string | number | null>, default: null }
}

export type DiagramProps = { at?: string | number | null }
export type DiagramTimeline = gsap.core.Timeline
export type DiagramPosition = string | number

export interface DiagramSetupOptions<S extends readonly string[]> {
  name: string
  animationLabels: S
  props: DiagramProps
  timeline: (timeline: DiagramTimeline) => void
  maxSeek?: number
}

export interface DiagramSetup<S extends readonly string[]> {
  from: number
  beats: number
  labelFor: (click: number) => S[number]
}

export const setupDiagram = <S extends readonly string[]>({
  name,
  animationLabels,
  props,
  timeline,
  maxSeek = Infinity
}: DiagramSetupOptions<S>): DiagramSetup<S> => {
  const { $clicks } = useSlideContext()
  const last = animationLabels.length - 1
  const at = props.at
  const given = at === "" ? null : (at ?? null)
  const wanted = given === null ? 0 : typeof given === "number" ? given : Number(given)

  const isCount = Number.isInteger(wanted) && wanted >= 0
  if (given !== null && !isCount) console.warn(`[${name}] at="${given}" is not a click count`)

  const from = isCount ? Math.max(wanted - 1, 0) : 0
  const beats = from + last
  const labelFor = (click: number) => animationLabels[Math.min(Math.max(click - from, 0), last)]

  let master: DiagramTimeline | null = null
  let seeker: gsap.core.Tween | null = null
  let ready = false

  const seekTime = (label: string) => Math.max(master?.labels[label] ?? 0, 0.0001)

  onMounted(() => {
    master = gsap.timeline({ paused: true })
    timeline(master)

    requestAnimationFrame(() => {
      master?.seek(seekTime(labelFor($clicks.value)), false)
      ready = true
    })
  })

  watch($clicks, step => {
    if (!master || !ready) return
    const target = seekTime(labelFor(step))
    const distance = Math.abs(target - master.time())
    if (distance < 0.01) return
    seeker?.kill()
    seeker = master.tweenTo(target, { duration: Math.min(distance, maxSeek), ease: "none" })
  })

  return { from, beats, labelFor }
}
