<script setup lang="ts">
import ImageRight from "@slidev/client/layouts/image-right.vue"
import { computed } from "vue"
import { useSlideContext } from "@slidev/client"
import { getAuthors, getPublicUrl, getSourceCode, getTitle } from "../components/utilities"

const props = defineProps({
  image: {
    type: String
  },
  backgroundSize: {
    type: String,
    default: "cover"
  }
})

const { $slidev, $nav } = useSlideContext()

const title = computed(() => getTitle($slidev))
const authors = computed(() => getAuthors($slidev))
const sourceCode = computed(() => getSourceCode($slidev))
const publicUrl = computed(() => getPublicUrl($slidev))
</script>

<template>
  <ImageRight
    class="flex flex-col justify-around text-center group/slide"
    :image="props.image"
    :background-size="props.backgroundSize"
  >
    <div>
      <slot>
        <h1>{{ title }}</h1>
      </slot>
    </div>

    <div class="flex justify-center mt-10">
      <p v-for="{ name, email } in authors" :key="`${name}${email}`" class="p-5 flex flex-col">
        <span>{{ name }}</span>
        <small v-if="email">{{ email }}</small>
      </p>
    </div>

    <div class="flex justify-center mt-5">
      <QRCode :value="publicUrl" />
    </div>

    <div
      class="mt-5 py-1 transition duration-300 op-0 group-hover/slide:op-30 hover:bg-white hover:bg-op-20"
      @click="() => $nav.nextSlide()"
    >
      Press Space for next page <carbon-arrow-right class="inline relative top-[2px]" />
    </div>

    <div class="abs-br m-2 text-xl">
      <a v-if="sourceCode" :href="sourceCode.url" target="_blank" class="slidev-icon-btn font-size-8">
        <CarbonLogoGithub v-if="sourceCode.provider === 'github'" />
        <CarbonLogoGitlab v-if="sourceCode.provider === 'gitlab'" />
        <CarbonLogoGit v-if="sourceCode.provider === 'generic'" />
      </a>
    </div>
  </ImageRight>
</template>
