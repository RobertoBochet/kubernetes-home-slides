---
level: 1
layout: statement
section:
  duration: 2m
---

## So, should I bring **Kubernetes** into my homelab?

<v-clicks>

### Maybe {class="mt-7 color-primary! font-bold!"}

### Why are you using Kubernetes at home? {class="mt-10 color-secondary!"}

</v-clicks>

<div class="flex justify-between items-center mt-10 h-40 text-align-left [&_blockquote]:w-50 [&_blockquote_li]:line-height-normal [&_blockquote_em]:text-2.5 [&_blockquote_em]:color-secondary" v-click>

<blockquote>

- Self-healing
- Declarative configuration
- A vast automation ecosystem

_@Monte_

</blockquote>

<blockquote class="mt-30">

- Automation
- Security
- Standardization

_@mishowHD_

</blockquote>

<blockquote>

- To learn it
- Low maintenance,  
  once set up
- GitOps +1.000.000 aura
- Bragging rights

_@Lorenzo Andreasi_

</blockquote>

</div>

---
level: 1
class: "[&_a]:color-primary"
---

# Takeaways

Useful links

**Try Kubernetes on your PC**  
Tools like [**kind**](https://kind.sigs.k8s.io/) or [**minikube**](https://minikube.sigs.k8s.io/) set up a Kubernetes test environment on your machine in minutes, so Kubernetes can be tried and studied without additional hardware

**Bring Kubernetes home**  
If you want Kubernetes on your own home server, consider installing [**k0s**](https://docs.k0sproject.io/) or [**k3s**](https://docs.k3s.io/)

**The official Kubernetes documentation**  
[**kubernetes.io/docs**](https://kubernetes.io/docs/) is precise and complete, but it may not be the place to start studying

**To start studying Kubernetes**  
The study program in the [**workshop slides**](https://robertobochet.github.io/kubernetes-workshop-slides) is the one I recommend to start with Kubernetes

**Fun fact: during the talk, these slides are served by a k0s cluster**  
The manifests in the `example/` folder of the [**repository**](https://github.com/RobertoBochet/kubernetes-home-slides) are the ones used to deploy these slides
