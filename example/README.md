# Deploying the slides on Kubernetes

Manifests for a Kubernetes cluster that build this deck from its Git repository and serve
it as a static site. No image is built for the slides: the build runs inside the cluster, in
the pod itself, and every component comes from a stock image.

## Deploy

```sh
kubectl apply -f example/   # from the repository root
```

The numeric prefix of each file is the apply order, and that order is the deployment read
as a sequence: a place to hold everything, where the deck comes from, the application
itself, its address inside the cluster, its way in from outside.

## `00-namespace.yaml`

A Namespace groups objects logically, typically all of those belonging to the same
application or project: names are unique within a namespace, and everything inside one is
deleted together. Every resource in the files that follow is created in
`kubernetes-home-slides`, which is why this file comes first.

## `10-configmap.yaml`

A ConfigMap holds configuration as key/value pairs, which pods read as environment
variables or as mounted files. This one carries `REPO_URL` and `GIT_REF`, the repository and
the branch the deck is built from. Point them at a repository and a branch you control
before deploying.

## `20-deployment.yaml`

A Deployment declares a workload and keeps the requested number of copies of it running.
Here it is a single pod that both builds and serves the deck, in three stages:

1. **clone**: an `alpine/git` image clones `REPO_URL` at `GIT_REF` into a shared volume
   mounted at `/repo`.
2. **build**: an `oven/bun` image runs `bun install --frozen-lockfile` and
   `bun run build --out /site` inside `/repo`, writing the static site into a second shared
   volume.
3. **serve**: `miniserve` publishes `/site` read-only on port 8080. It runs with `--spa`, so
   a path that does not exist as a file returns `index.html` and the deck's router resolves
   addresses such as `/12`.

The first two stages are init containers: they run in order and to completion before the
server starts, so the pod becomes ready only once a built site exists, and the deck is
rebuilt on every new pod instead of at request time. `strategy: Recreate` stops the old pod
before the new one is created, so two builds never run at the same time. All containers run
as non-root, with a read-only root filesystem and all capabilities dropped.

## `30-service.yaml`

A Service gives a set of pods a stable name and a virtual IP inside the cluster, and forwards
its ports to them; pods can be replaced without anything pointing at them changing. This one
listens on port 80 and forwards to the `http` port of the server container.

## `40-httproute.yaml`

An HTTPRoute belongs to the Gateway API and maps a hostname to a Service. It attaches to a
Gateway through `parentRefs`: here `public`, in the `gateway` namespace. That Gateway is not
part of this folder: it is deployed once on the cluster and shared by every service that
needs to be reachable from outside, with the traffic proxied by an implementation of the API
installed by an operator. Without a Gateway the route has no effect, and the file can be
dropped, reaching the Service from inside the cluster instead. Since it lives in another
namespace, the Gateway must accept routes from this one; and
`kubernetes-home-slides.example.org` must be replaced with a hostname that resolves to it.
