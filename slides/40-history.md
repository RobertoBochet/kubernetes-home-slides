---
title: The Kubernetes History
level: 1
section:
  duration: 6m
layout: timeline
transition: slide-up
asideClass: "flex flex-col justify-around items-center"
---

<TimelineItem date="1967-68" v-click>

IBM runs the first virtual machines  
on its System/360 mainframes

</TimelineItem>

<TimelineItem date="1994" v-click>

NASA builds the Beowulf cluster  
the first cluster of ordinary PCs

</TimelineItem>

<TimelineItem date="1996-99" v-click>

The birth of volunteer computing  
GIMPS, distributed.net, SETI@home

</TimelineItem>

<TimelineItem date="1998-99" v-click>

Google builds its first cluster  
to run its search service

</TimelineItem>

<TimelineItem date="1999-2000" v-click>

FreeBSD ships the first containers  
Jails, many systems on one kernel

</TimelineItem>

::title::

## History

::aside::

<ImageCard src="/history/beowulf-cluster.webp" alt="A Beowulf cluster of ordinary PCs" class="relative z-30 w-[155px] right-18 -rotate-4" v-click.fade-in.scale="2">

A Beowulf cluster

</ImageCard>

<ImageCard src="/history/seti-at-home.webp" alt="SETI@home running on BOINC, analysing radio telescope data" class="relative z-20 w-[168px] left-16 -top-4 rotate-4" v-click.fade-in.scale="3">

SETI@home on BOINC

</ImageCard>

<ImageCard src="/history/google-cluster.webp" alt="The corkboard rack of Google's first cluster" class="relative z-10 w-[150px] right-10 -top-8 -rotate-2" v-click.fade-in.scale="4">

Google's first server rack  
<small>[Carlo Nardone](https://commons.wikimedia.org/wiki/File:Google%27s_First_Production_Server_(1999)_rack_-_Computer_History_Museum_(2007-11-10_23.05.17_by_Carlo_Nardone).jpg), CC BY-SA 2.0</small>

</ImageCard>

<!--
[click]
- Mainframe era: one big machine, sliced up, the opposite of a cluster
- Its tool is the virtual machine: CP-40, then CP-67 on the System/360-67 (1967-68)
- The M44/44X came first but partial; hence "the first that really work"

[click] 
- 16 PCs (Intel 486DX4 100 MHz, RAM 16MB/pc)
- Two Ethernets per PC, channel bonded (10Mbps)
- Based on Linux
- Beowulf would become a class of clusters

[click]
- GIMPS (Jan 1996): searched for Mersenne primes
- distributed.net (1997): broke the 56-bit RC5 (a symmetric cipher) key
- SETI@home (17 May 1999): searched for artificial signals from radio telescopes

[click]
- First (small) cage: Exodus data center, Santa Clara, ~30 PCs
- Later they move to the "Corkboard" racks: 80 nodes each, boards nailed raw on corkboard
- A few dozen racks · first big order: 1,680 machines

[click]
- FreeBSD 4.0-RELEASE
- Unlike `chroot`, `Jails` isolate more than the filesystem: processes, users, network
-->

---
layout: timeline
transition: slide-up
hideInToc: true
asideClass: "flex flex-col justify-around items-center"
---

<TimelineItem date="2003-04">

Google starts work on Borg  
its own cluster manager

</TimelineItem>

<TimelineItem date="2008" v-click>

cgroups arrive in Linux  
Linux Containers (LXC) are born

</TimelineItem>

<TimelineItem date="2009" v-click>

Google builds Omega  
its second cluster manager

</TimelineItem>

<TimelineItem date="Spring 2013" v-click>

Docker is released  
The modern container is born

</TimelineItem>

<TimelineItem date="10 Jun 2014" v-click>

Google announces Kubernetes  
and releases its source code

</TimelineItem>

::title::

## History

::aside::

<ImageCard src="/history/docker-announce.webp" alt="Solomon Hykes presenting Docker at PyCon US 2013" class="relative w-[225px] right-3 -rotate-4" v-click.fade-in.scale="3">

Solomon Hykes shows Docker at PyCon  
<small>["The future of Linux Containers"](https://www.youtube.com/watch?v=wW9CAH9nSLs), 2013</small>

</ImageCard>

<ImageCard src="/history/kubernetes-announce.webp" alt="Eric Brewer announcing Kubernetes on stage at DockerCon 2014" class="relative w-[285px]  rotate-3" v-click.fade-in.scale="4">

Eric Brewer announces Kubernetes at DockerCon  
<small>["Dockercon keynote: Eric Brewer (Google)"](https://www.youtube.com/watch?v=YrxnVKZeqK8), 2014</small>

</ImageCard>

<!--
[click:0] 
- It's born from `Babysitter` + `Global Work Queue`
- It's a reference to Star Trek's Borg (cybernetic aliens, hive mind)

[click]
- It starts at Google in 2006 as "process containers" (Paul Menage, Rohit Seth)
- Renamed "control groups"
- Merged in Linux 2.6.24, Jan 2008
- LXC ships on 6 Aug 2008

[click]
- It's a greenfield redesign (Brian Grant, early 2009) against Borg's extensibility and scalability limits
- Its ideas back into Borg, its shape into Kubernetes
- Grant: "it's more of an open source of Omega than an open source Borg"
- "API in front of the state": planned for Omega, never done

[click]
- Solomon Hykes created Docker
- It was an internal project of dotCloud
- Made public on 23 Mar 2013
- Two months later, complete (Dockerfile, 30 May 2013)
- It introduced the container image (Dockerfile)
- One process per container

[click]
- Kubernetes was announced at DockerCon by Eric Brewer (Google)
- Brewer was VP of Infrastructure at Google
- He created the CAP theorem (2000)
- It's the start of the container orchestration war
- Its rivals: Apache Mesos (with Marathon), CoreOS Fleet, Docker's Libswarm
- Six months later: Swarm (DockerCon Europe, Dec 2014)
- Its original name was Seven of Nine (Project Seven): Star Trek: Voyager, ex-Borg drone
- It wanted to be "a friendlier Borg"
- Renamed for legal issues; the Seven reference stays in the logo (7 spokes)
-->

---
layout: timeline
transition: slide-up
hideInToc: true
asideClass: "flex flex-col justify-around items-center"
---

<TimelineItem date="24 Jun 2015">

Red Hat releases OpenShift 3  
based on Kubernetes

</TimelineItem>

<TimelineItem date="21 Jul 2015" v-click>

Kubernetes 1.0 is released  
and donated to the new CNCF

</TimelineItem>

<TimelineItem date="29 Nov 2017" v-click>

AWS adopts Kubernetes  
the last of the big clouds to adopt

</TimelineItem>

<TimelineItem date="3 May 2022" v-click>

Kubernetes drops Docker support

</TimelineItem>

<TimelineItem date="11 Jul 2023" v-click>

KubeVirt 1.0 is released  
virtualization on Kubernetes

</TimelineItem>

::title::

## History

::aside::

<ImageCard src="/history/aws-eks-announce.webp" alt="Andy Jassy announcing Amazon EKS on stage at AWS re:Invent 2017" class="relative w-[285px] rotate-2" v-click.fade-in.scale="2">

Andy Jassy announces Amazon EKS at re:Invent  
<small>["AWS re:Invent 2017 Keynote - Andy Jassy"](https://www.youtube.com/watch?v=1IxDLeFQKPk), 2017</small>

</ImageCard>

<!--
[click:0] 
- OpenShift 1 and 2 were PaaS
- OpenShift 2 used `gears`, a predecessor of Linux containers

[click]
- CNCF founding members include Google, CoreOS, Mesosphere, Red Hat, Twitter, Huawei, Intel, Cisco, IBM, Docker, Univa and VMware
- Today, over 700 members

[click]
- Andy Jassy was the CEO of AWS
- Its rival at AWS: ECS, the in-house orchestrator (announced 2014)
- CNCF survey: ~60% ran Kubernetes on AWS
- The container orchestration war is over
- Docker starts native Kubernetes support on 17 Oct 2017
- Azure adopts Kubernetes on 21 Feb 2017
- IBM adopts Kubernetes on 23 May 2017

[click]
- It used `dockershim` to talk to Docker (Docker is not CRI-compatible)
- It gained CRI in 1.5 (Dec 2016)
- It deprecated `dockershim` in 1.20 (2 Dec 2020)
- It removed it in 1.24 (3 May 2022)
- Docker images still run (OCI)

[click]
- It's a CNCF project
- It's the primary upstream of OpenShift Virtualization
- OpenShift Virtualization went GA on 17 Aug 2020 (OpenShift 4.5)
-->
