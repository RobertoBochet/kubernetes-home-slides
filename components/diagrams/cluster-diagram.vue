<script setup lang="ts">
import { useTemplateRef } from "vue"
import CarbonBareMetalServer from "~icons/carbon/bare-metal-server"
import CarbonContainerRuntime from "~icons/carbon/container-runtime"
import CarbonKubernetes from "~icons/carbon/kubernetes"
import CarbonLaptop from "~icons/carbon/laptop"
import K8sApiServer from "~icons/k8s/api-server"
import K8sControllerManager from "~icons/k8s/controller-manager"
import K8sEtcdCluster from "~icons/k8s/etcd-cluster"
import K8sKubeProxy from "~icons/k8s/kube-proxy"
import K8sKubelet from "~icons/k8s/kubelet"
import K8sPod from "~icons/k8s/pod"
import K8sScheduler from "~icons/k8s/scheduler"
import { type DiagramPosition, diagramProps, resolveRefs, setupDiagram } from "../utilities"
import DiagramArrow from "./components/diagram-arrow.vue"
import { DiagramArrowInstance, DiagramItemInstance } from "../types/diagram.ts"
import DiagramBox from "./components/diagram-box.vue"
import DiagramItem from "./components/diagram-item.vue"

const refs = {
  cp1: useTemplateRef<DiagramItemInstance>("cp1"),
  cp2: useTemplateRef<DiagramItemInstance>("cp2"),
  cp3: useTemplateRef<DiagramItemInstance>("cp3"),
  worker1: useTemplateRef<DiagramItemInstance>("worker1"),
  workerN: useTemplateRef<DiagramItemInstance>("workerN"),

  cp1Scheduler: useTemplateRef<DiagramArrowInstance>("cp1Scheduler"),
  cp1Manager: useTemplateRef<DiagramArrowInstance>("cp1Manager"),
  cp1Etcd: useTemplateRef<DiagramArrowInstance>("cp1Etcd"),
  cp2Scheduler: useTemplateRef<DiagramArrowInstance>("cp2Scheduler"),
  cp2Manager: useTemplateRef<DiagramArrowInstance>("cp2Manager"),
  cp2Etcd: useTemplateRef<DiagramArrowInstance>("cp2Etcd"),
  cp3Scheduler: useTemplateRef<DiagramArrowInstance>("cp3Scheduler"),
  cp3Manager: useTemplateRef<DiagramArrowInstance>("cp3Manager"),
  cp3Etcd: useTemplateRef<DiagramArrowInstance>("cp3Etcd"),

  peer12: useTemplateRef<DiagramArrowInstance>("peer12"),
  peer13: useTemplateRef<DiagramArrowInstance>("peer13"),
  peer23: useTemplateRef<DiagramArrowInstance>("peer23"),

  worker1Runtime: useTemplateRef<DiagramArrowInstance>("worker1Runtime"),
  worker1Pods: useTemplateRef<DiagramArrowInstance>("worker1Pods"),
  workerNRuntime: useTemplateRef<DiagramArrowInstance>("workerNRuntime"),
  workerNPods: useTemplateRef<DiagramArrowInstance>("workerNPods"),

  w1Kubelet: useTemplateRef<DiagramArrowInstance>("w1Kubelet"),
  w1Proxy: useTemplateRef<DiagramArrowInstance>("w1Proxy"),
  wNKubelet: useTemplateRef<DiagramArrowInstance>("wNKubelet"),
  wNProxy: useTemplateRef<DiagramArrowInstance>("wNProxy"),

  pod1: useTemplateRef<DiagramItemInstance>("pod1"),
  pod2: useTemplateRef<DiagramItemInstance>("pod2"),
  pod3: useTemplateRef<DiagramItemInstance>("pod3"),
  pod4: useTemplateRef<DiagramItemInstance>("pod4"),
  pod5: useTemplateRef<DiagramItemInstance>("pod5")
}

const BOX_FROM = { opacity: 0, scale: 0.92 }
const BOX_IN = { opacity: 1, scale: 1, duration: 0.26, ease: "back.out(1.6)" }
const POD_FROM = { opacity: 0, scale: 0.82 }
const POD_IN = { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.6)", stagger: 0.06 }
const SHORT = 0.3
const LONG = 0.45

const animationLabels = ["idle", "cp1", "peers", "workers"] as const

const props = defineProps(diagramProps)

const { beats } = setupDiagram({
  name: "cluster-diagram",
  animationLabels,
  props,
  timeline: tl => {
    const parts = resolveRefs(refs)
    if (!parts) return

    const { cp2, cp3, worker1, workerN } = parts
    const { cp1Scheduler, cp1Manager, cp1Etcd, cp2Scheduler, cp2Manager, cp2Etcd } = parts
    const { cp3Scheduler, cp3Manager, cp3Etcd, peer12, peer13, peer23 } = parts
    const { worker1Runtime, worker1Pods, workerNRuntime, workerNPods } = parts
    const { w1Kubelet, w1Proxy, wNKubelet, wNProxy } = parts
    const { pod1, pod2, pod3, pod4, pod5 } = parts

    const arrows = [
      cp1Scheduler,
      cp1Manager,
      cp1Etcd,
      cp2Scheduler,
      cp2Manager,
      cp2Etcd,
      cp3Scheduler,
      cp3Manager,
      cp3Etcd,
      peer12,
      peer13,
      peer23,
      worker1Runtime,
      worker1Pods,
      workerNRuntime,
      workerNPods,
      w1Kubelet,
      w1Proxy,
      wNKubelet,
      wNProxy
    ]
    const pods = [pod1, pod4, pod2, pod3, pod5]

    tl.set([cp2.$el, cp3.$el, worker1.$el, workerN.$el, ...arrows.map(a => a.$el), ...pods.map(p => p.$el)], {
      opacity: 0,
      immediateRender: true
    })
    tl.addLabel("idle", 0.01)

    const draw = (arrow: DiagramArrowInstance, duration: number, at: DiagramPosition) => {
      tl.to(arrow.$el, { opacity: 1, duration: 0.1, ease: "none" }, at)
      tl.add(arrow.createTimeline(duration), at)
    }

    const drawAll = (group: DiagramArrowInstance[], at: DiagramPosition) => {
      group.forEach(arrow => {
        draw(arrow, SHORT, at)
      })
    }

    const drawMachine = (etcd: DiagramArrowInstance, controllers: DiagramArrowInstance[], at: string, name: string) => {
      draw(etcd, SHORT, at)
      tl.addLabel(`${name}Controllers`, ">0.1")
      drawAll(controllers, `${name}Controllers`)
    }

    tl.addLabel("cp1Arrows", "idle+=0.15")
    drawMachine(cp1Etcd, [cp1Scheduler, cp1Manager], "cp1Arrows", "cp1")
    tl.addLabel("cp1", ">0.15")

    tl.fromTo([cp2.$el, cp3.$el], BOX_FROM, BOX_IN, "cp1")
    tl.to([peer12.$el, peer13.$el, peer23.$el], { opacity: 1, duration: 0.35, ease: "none", stagger: 0.06 }, ">0.2")
    tl.addLabel("cp2Arrows", ">0.2")
    drawMachine(cp2Etcd, [cp2Scheduler, cp2Manager], "cp2Arrows", "cp2")
    tl.addLabel("cp3Arrows", ">0.15")
    drawMachine(cp3Etcd, [cp3Scheduler, cp3Manager], "cp3Arrows", "cp3")
    tl.addLabel("peers", ">0.15")

    tl.fromTo([worker1.$el, workerN.$el], BOX_FROM, BOX_IN, "peers")
    tl.addLabel("fan", ">0.2")
    draw(w1Kubelet, LONG, "fan")
    draw(w1Proxy, LONG, "fan+=0.08")
    draw(wNKubelet, LONG, "fan+=0.16")
    draw(wNProxy, LONG, "fan+=0.24")
    tl.addLabel("inside", ">0.15")
    draw(worker1Runtime, SHORT, "inside")
    draw(workerNRuntime, SHORT, "inside")
    tl.addLabel("pods", ">0.1")
    draw(worker1Pods, SHORT, "pods")
    draw(workerNPods, SHORT, "pods")
    tl.fromTo(
      pods.map(p => p.$el),
      POD_FROM,
      POD_IN,
      ">0.15"
    )
    tl.addLabel("workers", ">0.2")
  }
})
</script>

<template>
  <DiagramBox :icon="CarbonKubernetes" label="kubernetes" class="w-full h-full">
    <span v-for="beat in beats" :key="beat" v-click class="hidden" />

    <DiagramBox
      ref="cp1"
      :icon="CarbonBareMetalServer"
      label="Control Plane 1"
      class="absolute! w-60 h-40 top-30 left-90 [&>div]:absolute"
    >
      <DiagramItem :icon="K8sEtcdCluster" class="top-[14px] left-[174px]">etcd</DiagramItem>
      <DiagramItem :icon="K8sApiServer" class="bottom-[10px] left-[25px]">APIserver</DiagramItem>
      <DiagramItem :icon="K8sScheduler" class="top-[29px] left-[17px]">Scheduler</DiagramItem>
      <DiagramItem :icon="K8sControllerManager" class="bottom-[10px] right-[8px]">Controller<br />Manager</DiagramItem>

      <DiagramArrow ref="cp1Scheduler" class="top-0 left-0" dashed d="M55.8 78.7L60.4 96.9" />
      <DiagramArrow ref="cp1Manager" class="top-0 left-0" dashed d="M149.2 115.1L85.4 119.7" />
      <DiagramArrow ref="cp1Etcd" class="top-0 left-0" dashed d="M84.8 103.2L173.6 38.9" />
    </DiagramBox>

    <DiagramBox
      ref="cp2"
      :icon="CarbonBareMetalServer"
      label="Control Plane 2"
      class="absolute! w-60 h-40 top-10 left-10 [&>div]:absolute"
    >
      <DiagramItem :icon="K8sEtcdCluster" class="top-[14px] left-[174px]">etcd</DiagramItem>
      <DiagramItem :icon="K8sScheduler" class="top-[29px] left-[17px]">Scheduler</DiagramItem>
      <DiagramItem :icon="K8sApiServer" class="top-[102px] left-[140px]">APIserver</DiagramItem>
      <DiagramItem :icon="K8sControllerManager" class="top-[90px] left-[8px]">Controller<br />Manager</DiagramItem>

      <DiagramArrow ref="cp2Scheduler" class="top-0 left-0" dashed d="M82.8 47.7L164.7 95" />
      <DiagramArrow ref="cp2Manager" class="top-0 left-0" dashed d="M66.2 102.4L157.3 110.9" />
      <DiagramArrow ref="cp2Etcd" class="top-0 left-0" dashed d="M182.9 93.3L188 62" />
    </DiagramBox>

    <DiagramBox
      ref="cp3"
      :icon="CarbonBareMetalServer"
      label="Control Plane 3"
      class="absolute! w-60 h-40 top-5 right-10 [&>div]:absolute"
    >
      <DiagramItem :icon="K8sEtcdCluster" class="top-[30px] left-[20px]">etcd</DiagramItem>
      <DiagramItem :icon="K8sApiServer" class="bottom-[15px] right-[25px]">APIserver</DiagramItem>
      <DiagramItem :icon="K8sScheduler" class="top-[20px] right-[17px]">Scheduler</DiagramItem>
      <DiagramItem :icon="K8sControllerManager" class="bottom-[10px] left-[8px]">Controller<br />Manager</DiagramItem>

      <DiagramArrow ref="cp3Scheduler" class="top-0 left-0" dashed d="M69.6 100.2L149.8 108.7" />
      <DiagramArrow ref="cp3Manager" class="top-0 left-0" dashed d="M179.4 66.6L176 88.2" />
      <DiagramArrow ref="cp3Etcd" class="top-0 left-0" dashed d="M156.7 91.1L63.9 49.5" />
    </DiagramBox>

    <DiagramBox ref="worker1" :icon="CarbonLaptop" label="Worker 1" class="absolute! w-70 bottom-5 left-30">
      <DiagramItem :icon="K8sKubelet" class="absolute top-[15px] left-[90px]">kubelet</DiagramItem>
      <DiagramItem :icon="K8sKubeProxy" class="absolute top-[35px] right-[10px]">kube-proxy</DiagramItem>
      <DiagramItem :icon="CarbonContainerRuntime" class="absolute bottom-[30px] left-[0px]">containerd</DiagramItem>

      <DiagramBox class="w-full h-[78px] mt-15 ml-25">
        <DiagramItem ref="pod1" :icon="K8sPod">pod1</DiagramItem>
        <DiagramItem ref="pod4" :icon="K8sPod">pod4</DiagramItem>
      </DiagramBox>

      <DiagramArrow ref="worker1Runtime" class="top-0 left-0" dashed d="M89.1 42.7L45 97" />
      <DiagramArrow ref="worker1Pods" class="top-0 left-0" dashed d="M56.3 119.2L102.4 129.8" />
    </DiagramBox>

    <DiagramBox ref="workerN" :icon="CarbonLaptop" label="Worker N" class="absolute! w-70 bottom-5 right-40">
      <DiagramItem :icon="K8sKubelet" class="absolute top-[15px] left-[90px]">kubelet</DiagramItem>
      <DiagramItem :icon="K8sKubeProxy" class="absolute top-[35px] right-[10px]">kube-proxy</DiagramItem>
      <DiagramItem :icon="CarbonContainerRuntime" class="absolute bottom-[30px] left-[0px]">containerd</DiagramItem>

      <DiagramBox class="w-full h-[78px] mt-15 ml-25">
        <DiagramItem ref="pod2" :icon="K8sPod">pod2</DiagramItem>
        <DiagramItem ref="pod3" :icon="K8sPod">pod3</DiagramItem>
        <DiagramItem ref="pod5" :icon="K8sPod">pod5</DiagramItem>
      </DiagramBox>

      <DiagramArrow ref="workerNRuntime" class="top-0 left-0" dashed d="M89.1 42.7L45 97" />
      <DiagramArrow ref="workerNPods" class="top-0 left-0" dashed d="M56.3 119.2L102.4 129.8" />
    </DiagramBox>

    <DiagramArrow ref="peer12" class="top-0 left-0" dashed double d="M259.2 77.9L531.8 140.5" />
    <DiagramArrow ref="peer23" class="top-0 left-0" dashed double d="M259.5 59.1L691.5 55.3" />
    <DiagramArrow ref="peer13" class="top-0 left-0" dashed double d="M578.2 135.7L692.8 76.7" />

    <DiagramArrow ref="w1Kubelet" class="top-0 left-0" dashed d="M239.3 332.9L221.6 191.7" />
    <DiagramArrow ref="w1Proxy" class="top-0 left-0" dashed d="M337.7 351.6L246.7 191.7" />

    <DiagramArrow ref="wNKubelet" class="top-0 left-0" dashed d="M650.7 334.0L820.9 168.4" />
    <DiagramArrow ref="wNProxy" class="top-0 left-0" dashed d="M755.4 351.1L842.5 170.1" />
  </DiagramBox>
</template>
