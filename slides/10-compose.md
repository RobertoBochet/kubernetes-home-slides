---
title: "Docker Compose limits"
level: 1
section:
  duration: 10m
layout: two-cols
---

## Let's start from a Compose file

<div class="mt-10"/>

<v-click>

### If we also need a reverse proxy<br/>in the stack?

</v-click>

<v-click>

The reverse proxy is deployed exactly like the others, isolated; it does not know which services exist, nor where they answer.

Every request arrives at the proxy<br/>and must be sent on to the right service.

So the list of services and endpoints  
is written by hand, in its own file.

When a service changes, the file stays as it was, and the two drift apart.

</v-click>

::right::

````md magic-move {lines:true,at:2}
```yaml
services:
  navidrome:
    image: navidrome/navidrome
    restart: unless-stopped
    volumes:
      - ./navidrome_data:/data
      - /mnt/multimedia/music:/music:ro
    ports:
      - 4533:4533
```

```yaml {*}
services:
  navidrome:
    image: navidrome/navidrome
    restart: unless-stopped
    volumes:
      - ./navidrome_data:/data
      - /mnt/multimedia/music:/music:ro
    networks:
      - caddy

  caddy:
    image: caddy
    restart: unless-stopped
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./caddy_data:/data
      - ./caddy_config:/config
    ports:
      - 80:80
    networks:
      - caddy

networks:
  caddy:
```
````

---
layout: two-cols
layoutClass: "grid-cols-[52fr_48fr]!"
---

```yaml {all|16-19|10|all}{lines: true}
services:
  traefik:
    image: traefik
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
    ports:
      - 80:80
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - traefik

  whoami:
    image: traefik/whoami
    labels:
      - traefik.enable=true
      - traefik.http.routers.me.rule=Host(`me.localhost`)
      - traefik.http.routers.me.entrypoints=web
    networks:
      - traefik

networks:
  traefik:
```

::right::

## Case in point: Traefik labels

<v-clicks at="1">

[Traefik](https://doc.traefik.io/traefik/) turned the **container labels** into configuration:  
the rule that exposes a service is written in the Compose file, **read from the container**

<NoteBox level="Alert">

The Iron Price:  
mounting the Docker socket is equivalent to giving the container **root permissions on the host**.

</NoteBox>

Docker separates two roles by design:<br/>the manager, which creates the containers,<br/>and the service, which only runs inside them.<br/>The model gives a service no way to the manager

</v-clicks>

<!--
- Its reason for labels: a container appears or disappears, the configuration follows it
-->

---
layout: statement
---

## Does this limit stop at reverse proxies?

<v-click>

### Well, NO {class='mt-5 text-8!'}

<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-10 [&>p]:m-0 [&>p:nth-child(odd)]:text-right [&>p:nth-child(even)]:text-left [&>p:nth-child(even)]:color-gray! [&>p:nth-child(even)_a]:color-gray!">

**Volume Backup**

_e.g._ [docker-volume-backup](https://github.com/offen/docker-volume-backup)

**Image Updates**

_e.g._ [~~watchtower~~](https://github.com/containrrr/watchtower)

**Log Collection**

_e.g._ [~~logspout~~](https://github.com/gliderlabs/logspout)

**Shared Certificates**

_e.g._ [acme-companion](https://github.com/nginx-proxy/acme-companion)

and more... {class="text-center! col-span-2"}

</div>

</v-click>

---
layout: two-cols
layoutClass: "grid-cols-[65fr_35fr]!"
---

## What if the services multiply?

<v-clicks at="1">

**A pattern is needed to keep order**  
_e.g._ a folder per service, a folder for its data, a template unit  
It can drift easily

**Or an established convention**  
No need to reinvent the wheel  
_e.g._ [Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html)

**Or better yet, a small orchestrator**  
A layer on top of Compose:  
not only a standard, but also additional management tools  
_e.g._ [Portainer](https://github.com/portainer/portainer)

</v-clicks>

::right::

<v-click at="1">

```mermaid {class: 'bg-secondary p-2 rounded-md'}
treeView-beta
    etc/
        systemd/system/
            docker-compose@.service
        compose-services/
            navidrome/
                compose.yaml
            forgejo/
                compose.yaml
            caddy/
                config/
                    Caddyfile
                compose.yaml
    var/
        lib/
            compose-services/
                navidrome/
                forgejo/
                caddy/
```

</v-click>

---
layout: statement
---

## What if the state drifts?

<p class="color-secondary text-sm !mt-1 !line-height-snug italic">
e.g. a network interface is gone,<br/>
a service answers with errors
</p>

<v-click>

`compose up` sets up the required components;  
after that, its job is done

It acts like an **open-loop controller**:  
state drift is neither monitored nor reconciled

</v-click>

<v-click>

[HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck) was a step in the closed-loop direction,  
but it only measures: no fix has followed so far

</v-click>

---
title: "The Compose alternative: Kubernetes"
level: 2
layout: image-left
image: /kubernetes-bg.svg
---

# Kubernetes

<p class="color-secondary text-sm mt-[-1rem]!">/ˌk(j)uːbərˈnɛtɪs/</p>

...also known as **K8s**, is a **container orchestrator** system.

<v-clicks>

A **container orchestrator** system is responsible for managing service containers among a group of machines that act as one (**cluster**).

<em class="text-sm">Fun fact: The name Kubernetes comes from the Ancient Greek term κυβερνήτης, kubernḗtēs (helmsman, pilot)</em>

</v-clicks>
