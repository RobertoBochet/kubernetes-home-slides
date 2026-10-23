---
level: 1
title: "Kubernetes in a Homelab"
section:
  duration: 9m
---

## The homelab trade-off

<div class="grid grid-cols-2 gap-[40px] p-10 mt-10">

<NoteBox level="Info" class="p-4! m-0!" v-click>

### What we want from k8s

- Declarative state and reconciliation
- The standard **Kubernetes API**
- The rich Operator ecosystem

</NoteBox>

<NoteBox level="Alert" class="p-4! m-0!" v-click>

### What we do not like about k8s

- Heavy resource footprint
- High setup friction

</NoteBox>

<NoteBox level="Warning" class="p-4! m-0! col-span-2 w-[400px] justify-self-center" v-click>

### What we are willing to sacrifice

- Node-level **High Availability**

</NoteBox>

</div>

---

## The lightweight alternatives

<div class="grid grid-cols-[2fr_3fr_3fr] justify-center gap-x-5 gap-y-6 w-80% mx-auto mt-5 [&_p]:m-0 [&>:nth-child(3n+2)]:justify-self-center [&>:nth-child(3n)]:justify-self-center [&_p]:leading-[1em]">

<div/>

<a href="https://k0sproject.io/" target="_blank">
<LightOrDark>
  <template #dark>
    <img src="/logos/k0s-dark.svg" alt="k0s logo" class="h-20"/>
  </template>
  <template #light>
    <img src="/logos/k0s.svg" alt="k0s logo" class="h-20"/>
  </template>
</LightOrDark>
</a>

<a href="https://k3s.io/" target="_blank">
<LightOrDark>
  <template #dark>
    <img src="/logos/k3s-dark.svg" alt="k3s logo" class="h-20"/>
  </template>
  <template #light>
    <img src="/logos/k3s.svg" alt="k3s logo" class="h-20"/>
  </template>
</LightOrDark>
</a>

Requirements  
<small class="color-gray">Single node</small>

[1GB RAM / 1vCPU](https://docs.k0sproject.io/stable/system-requirements/)

[2GB RAM / 2vCPU](https://docs.k3s.io/reference/resource-profiling)

Approach

[Zero opinion](https://docs.k0sproject.io/stable/governance/cncf/gtr/)

[Batteries included](https://docs.k3s.io/installation/packaged-components)

[Certified Kubernetes  
<small class="color-gray">CNCF conformance</small>](https://www.cncf.io/training/certification/software-conformance/)

[<CarbonCheckmark class="color-primary" />](https://github.com/cncf/k8s-conformance/tree/master/v1.36/k0s)

[<CarbonCheckmark class="color-primary" />](https://github.com/cncf/k8s-conformance/tree/master/v1.36/k3s)

CNCF Project

[<CarbonCheckmark class="color-primary" /> <Label>sandbox</Label>  
<span class="text-xs color-gray">since Jan 2025</span>](https://www.cncf.io/projects/k0s/)

[<CarbonCheckmark class="color-primary" /> <Label>sandbox</Label>  
<span class="text-xs color-gray">since Aug 2020</span>](https://www.cncf.io/projects/k3s/)

License

[Apache License 2.0](https://github.com/k0sproject/k0s/blob/main/LICENSE)

[Apache License 2.0](https://github.com/k3s-io/k3s/blob/main/LICENSE)

</div>

---

## Setup example: **k0s** single node

<v-click>

Pull the k0s binary

```shell
curl -sSf https://get.k0s.sh | sh
```

Install the k0s controller

```shell
k0s install controller --single
```

Start the k0s "cluster"

```shell
k0s start
```

Done.

</v-click>

---
layout: image-right
image: /workshop.webp
---

## The experimental workshop

A small class, basic competence in self-hosting, zero Kubernetes knowledge

A program similar to [CKAD](https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/)'s

<QRCode value="https://robertobochet.github.io/kubernetes-workshop-slides" class="mx-auto w-20! mt-10" v-click />

<!--
- From October 2025 to May 2026
- About 10 people
- CKAD, not CKA: real k8s cluster administration is out of the target's scope
-->

---
title: Real Kubernetes homelabs
level: 2
class: flex flex-wrap w-full h-full items-center justify-center content-center gap-x-4 gap-y-4 p-5
---

<ImageCard src="/homelabs/roberto.webp" alt="k0s on a custom build" class="w-[200px] rotate-3">
Custom build<br/>
<Label color="blue">k0s</Label> <small>~60 Pods @Roberto</small>
<template #full-caption>

<Label color="blue">k0s</Label> Intel Celeron J3455 4 CPU ~ 16GB RAM  
[Running on an immutable distro based on bootc](https://github.com/RobertoBochet/k0snode-bootc)  
Home automation services, Immich, Forgejo, media server stack

</template>
</ImageCard>

<ImageCard src="/homelabs/giacomo.webp" alt="k3s on a spare-parts build" class="w-[200px] -rotate-3.5">
Spare-parts build<br/>
<Label color="green">k3s</Label> <small>~30 Pods @mishowHD</small>
<template #full-caption>
<Label color="green">k3s</Label> Spare-parts build ~ NixOS<br/>
Immich, Nextcloud
</template>
</ImageCard>

<ImageCard src="/homelabs/lollo.webp" alt="k0s on an enterprise server" class="w-[175px] rotate-2.5">
Old enterprise server<br/>
<Label color="blue">k0s</Label> <small>~90 Pods @Lorenzo Andreasi</small>
<template #full-caption>
<Label color="blue">k0s</Label> Xeon E5-2420 v2 12 CPU ~ 32GB RAM ~ 12TB storage<br/>
Vaultwarden, Immich, Nextcloud, Navidrome, Jellyfin
</template>
</ImageCard>

<ImageCard src="/homelabs/lollo-raspberry.webp" alt="k3s on a Raspberry Pi 5" class="w-[175px] -rotate-2">
Raspberry Pi 5 (ARM)<br/>
<Label color="green">k3s</Label> <small>~30 Pods @Lorenzo Andreasi</small>
<template #full-caption>
<Label color="green">k3s</Label> 4 CPU (ARM) ~ 4GB RAM<br/>
Unbound, AdGuard, Home Assistant
</template>
</ImageCard>

<ImageCard src="/homelabs/yoshi.webp" alt="k3s on a ThinkCentre VM" class="w-[200px] rotate-4">
VM on ThinkCentre<br/>
<Label color="green">k3s</Label> <small>~35 Pods @marcosti</small>
<template #full-caption>
<Label color="green">k3s</Label> ThinkCentre ~ VM on Proxmox<br/>
Forgejo, HedgeDoc, Immich, Keycloak, Nextcloud
</template>
</ImageCard>

<ImageCard src="/homelabs/monte.webp" alt="k0s on a Ryzen 7 2700X build" class="w-[150px] -rotate-3">
Spare-parts build<br/>
<Label color="blue">k0s</Label> <small>~70 Pods @Monte</small>
<template #full-caption>
<Label color="blue">k0s</Label> Ryzen 7 2700X 16 CPU ~ 16GB RAM ~ bootc<br/>
Forgejo, Minecraft server, Immich, wger, Grimmory
</template>
</ImageCard>

<ImageCard src="/homelabs/valentina.webp" alt="k3s on a ThinkCentre VM" class="w-[175px] rotate-1.5">
VM on ThinkCentre<br/>
<Label color="green">k3s</Label> <small>~10 Pods @Valentina</small>
<template #full-caption>
<Label color="green">k3s</Label> ThinkCentre ~ VM on Proxmox ~ 3 vCPU ~ 8GB RAM ~ Fedora IoT
</template>
</ImageCard>

<ImageCard src="/homelabs/bardo.webp" alt="k3s on a Beelink EQ14" class="w-[175px] rotate-1.5">
Minipc<br/>
<Label color="green">k3s</Label> <small>~25 Pods @bardo</small>
<template #full-caption>
<Label color="green">k3s</Label> Beelink EQ14 (N150) ~ 4 CPU ~ 16GB RAM ~ Alpine Linux<br/>
Home Assistant, Imaginary, RustDesk
</template>
</ImageCard>

<ImageCard src="/homelabs/cloud.svg" alt="k0s on Hetzner VPS" class="w-[175px] -rotate-2">
VPS on Hetzner<br/>
<Label color="blue">k0s</Label> <small>~35 Pods @Roberto</small>
<template #full-caption>

<Label color="blue">k0s</Label> VPS on Hetzner ~ 4 vCPU ~ 8GB RAM  
[Running on an immutable distro based on bootc](https://github.com/RobertoBochet/k0snode-bootc)  
Personal mail server, VPN coordinator

</template>
</ImageCard>
