<script setup lang="ts">
import Center from "@slidev/client/layouts/center.vue"
import { computed } from "vue"
import { getSourceCode, getAuthors, getTitle, getPublicUrl } from "../components/utilities"
import { useSlideContext } from "@slidev/client"

const { $slidev } = useSlideContext()

const title = computed(() => getTitle($slidev))
const authors = computed(() => getAuthors($slidev))
const sourceCode = computed(() => getSourceCode($slidev))
const publicUrl = computed(() => getPublicUrl($slidev))
</script>

<template>
  <Center
    class="slidev-layout full w-full h-full grid grid-flow-col grid-rows-[minmax(0,1fr)_minmax(0,4fr)_minmax(0,1fr)] gap-5 place-items-center justify-items-center py-2"
  >
    <div class="text-15 mt-5 text-center">Thank you for your attention!</div>

    <div class="self-stretch justify-self-stretch grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
      <div class="flex flex-col justify-between items-center">
        <slot>
          <h1>{{ title }}</h1>
        </slot>
      </div>

      <div class="flex flex-col justify-between items-center">
        <div class="flex justify-center">
          <p v-for="{ name, email } in authors" :key="`${name}${email}`" class="p-5 flex flex-col">
            <span>{{ name }}</span>
            <small v-if="email">{{ email }}</small>
          </p>
        </div>
        <slot name="additional-credits"></slot>
      </div>
    </div>

    <div class="abs-bl m-5 text-xl flex flex-row flex-nowrap items-center">
      <LicenseBadge hide-text />
      <a v-if="sourceCode" :href="sourceCode.url" target="_blank" class="slidev-icon-btn font-size-8 block">
        <CarbonLogoGithub v-if="sourceCode.provider === 'github'" />
        <CarbonLogoGitlab v-if="sourceCode.provider === 'gitlab'" />
        <CarbonLogoGit v-if="sourceCode.provider === 'generic'" />
      </a>
    </div>

    <div class="abs-br m-5">
      <QRCode :value="publicUrl" class="w-20!" />
    </div>
  </Center>
</template>
