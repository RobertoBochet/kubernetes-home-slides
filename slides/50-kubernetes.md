---
title: How Kubernetes works
level: 1
section:
  duration: 12m
layout: two-cols
layoutClass: "grid-cols-[64fr_36fr]!"
---

## Desired state vs real state in Kubernetes

<p class="color-secondary text-sm italic">
In Docker Compose, <code>compose up</code> aligns the services once, then nothing watches it
</p>

<v-clicks>

Kubernetes changes this paradigm: a **desired state** is declared,  
and the **real state** is kept aligned over time

To achieve this, Kubernetes maintains a representation of the  
desired state in the **resources**: documents with a fixed schema

Then it creates and maintains the corresponding real state

The real state follows any change to a **resource**

New resources or changes can be requested with the  
`kubectl apply -f resource.yaml` command, where the  
provided file is a representation of the resource, called a **manifest**

Resources are not limited to `Pods`

</v-clicks>

::right::

<KubernetesStateDiagram at="2" />

---
layout: two-cols
---

```yaml {all|1-2|3-7|8-16|17-20|all}{lines: true}
apiVersion: v1
kind: Pod
metadata:
  name: navidrome
  namespace: media
  annotations:
    example.com/owner: "team-media"
spec:
  restartPolicy: Always
  containers:
    - name: navidrome
      image: navidrome/navidrome
      ports:
        - containerPort: 4533
          name: http
  # [...]
status:
  phase: Running
  podIP: 10.244.0.123
  # [...]
```

::right::

## Anatomy of a manifest

<div class="[&_em]:text-sm [&_em]:color-secondary">
<v-clicks at="1">

`apiVersion` / `kind`  
_they say what kind of resource the manifest describes_

`metadata`  
_it identifies the resource, and can carry extra data, the annotations; its schema does not depend on the kind._

`spec`  
_it describes the desired state,  
and its schema is defined by the kind of resource._

`status`  
_it is read-only, and describes the real state of the resource now._

</v-clicks>
</div>

---
layout: two-cols
layoutClass: "grid-cols-[64fr_36fr]!"
---

## The controller closes the loop

<v-clicks>

The **controller** watches the resources it is responsible for

It compares the **desired state** with the **real state**

If the **real state** drifts, it performs<br/>
the actions required to reconcile them

Finally, it updates the `.status` field of the resource

</v-clicks>

<NoteBox level="Info" class="mt-24!" v-click>

A **controller** does not only change the real state: it may create resources too

<div class="flex items-start gap-6 mt-2">
<!--<div class="flex flex-col items-center gap-1"><CarbonDocument class="w-5 h-5 color-primary" /><span>deployment-1</span></div>-->
<DiagramItem>deployment-1</DiagramItem>
<CarbonArrowRight class="text-4 color-primary mt-1" />
<DiagramItem>replicaset-1-1</DiagramItem>
<CarbonArrowRight class="text-4 color-primary mt-1" />
<DiagramItem>pod-1-1-1</DiagramItem>
<DiagramItem>pod-1-1-2</DiagramItem>
</div>

</NoteBox>

::right::

<ControlLoopDiagram />

---
layout: two-cols
layoutClass: "grid-cols-[62fr_38fr]!"
---

## The operator pattern

Kubernetes' strength is not the resource types it ships,  
but the ones anyone can add

<v-clicks>

**Custom resource definitions** (CRDs)  
add new resource types to Kubernetes

Once a CRD declares a type, its resources are managed  
by a **custom controller**, deployed inside the cluster

`.metadata.annotations` carry extra data  
that custom controllers can read and use

</v-clicks>

::right::

<div v-click class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-10 mt-14 text-sm [&>p]:m-0 [&_svg]:text-12">

<SelfhstCertManager />

[**cert-manager**](https://cert-manager.io)  
_provides support for issuing and managing TLS certificates_

<SelfhstCloudnativepg />

[**CloudNativePG**](https://cloudnative-pg.io)  
_manages PostgreSQL instances, backups, upgrades and replicas_

<SelfhstNginx />

[**NGINX Gateway Fabric**](https://github.com/nginx/nginx-gateway-fabric)  
_exposes internal services to external traffic and terminates TLS_

</div>

---
layout: two-cols
layoutClass: "grid-cols-[64fr_36fr]!"
---

## Helm: the package manager<br/>for Kubernetes

<v-clicks>

Its packages are called **charts**,  
and they are archives of templated manifests

Each chart declares default values  
that can be overridden with a `values.yaml`

`helm install` installs the chart with the values,  
and creates its resources in the cluster

</v-clicks>

::right::

<HelmDiagram />

---
layout: two-cols
layoutClass: "grid-cols-[64fr_36fr]!"
---

## GitOps in Kubernetes

The desired state of Kubernetes<br/>
can be represented as a set of YAML files,<br/>
which makes Kubernetes a natural fit for **GitOps**

<v-click>

This desired state can be versioned in a Git repository,  
an operator keeps the cluster aligned with what is committed,  
following the operator pattern

</v-click>

<v-click>

Versioning brings **history**, rollback, and version bumps as commits  
(by hand, or automated),  
and the cluster is reconciled back to what the repository declares

</v-click>

<div v-click class="grid grid-cols-[auto_auto] justify-center justify-items-center gap-x-32 mt-8 text-xl">

<ThesvgColorFlux class="text-20" />

<SelfhstArgoCd class="text-20" />

[**Flux**](https://fluxcd.io)

[**Argo CD**](https://argoproj.github.io/cd/)

</div>

::right::

<GitopsDiagram />

---

## Two kinds of nodes

A cluster is a set of machines, the nodes;  
a node takes its role from the components running on it

<div class="grid grid-cols-2 gap-x-10 gap-y-5 [&_p]:m-0 [&_em]:text-sm [&_em]:color-secondary [&>div]:space-y-5 [&>div]:px-3!">

<v-click>

[**Control plane**](https://kubernetes.io/docs/concepts/architecture/#control-plane-components)  
_making the global decisions_

[**Worker**](https://kubernetes.io/docs/concepts/architecture/#node-components)  
_hosting the Pods_

</v-click>

<v-click>

<div>

[`kube-apiserver`](https://kubernetes.io/docs/concepts/architecture/#kube-apiserver)  
_the access point for kubectl and for every component_

[`etcd`](https://kubernetes.io/docs/concepts/architecture/#etcd)
[<SelfhstEtcd class="text-4 align-middle ml-2" />](https://etcd.io/)  
_the only stateful component:  
it keeps the control planes aligned_

[`kube-scheduler`](https://kubernetes.io/docs/concepts/architecture/#kube-scheduler)  
_the component that schedules each new Pod onto a node_

[`kube-controller-manager`](https://kubernetes.io/docs/concepts/architecture/#kube-controller-manager)  
_the process that runs the controllers_

</div>

<div>

[`kubelet`](https://kubernetes.io/docs/concepts/architecture/#kubelet)  
_watches the API for the Pods assigned to its node_

[`kube-proxy`](https://kubernetes.io/docs/concepts/architecture/#kube-proxy)  
_programs the rules that let traffic reach the Pods_

[Container Runtime](https://kubernetes.io/docs/concepts/architecture/#container-runtime)
[<ThesvgColorContainerd class="text-4 align-middle ml-2" />](https://containerd.io/docs/)
[<ThesvgColorCriOLight class="text-4 align-middle ml-2" />](https://cri-o.io/#what-is-cri-o)  
_runs the containers of the Pods, driven by the kubelet_

</div>

</v-click>

</div>

<NoteBox level="Info" class="relative w-[calc(50%-20px)] ml-auto! -top-20" v-click>

etcd's quorum sets the minimum for high availability:  
three control planes, with a fault tolerance of $⌊(N − 1)/2⌋$

</NoteBox>

---
title: Generic cluster architecture
level: 2
layout: none
class: "h-full p-3 relative slidev-layout"
---

## Generic cluster architecture {class="absolute top-4 left-85 text-6!"}

<ClusterDiagram class="h-full w-full" />
