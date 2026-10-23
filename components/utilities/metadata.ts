import { $slidev } from "../types"
import { useSlideContext } from "@slidev/client"
import { computed } from "vue"

export type Author = { name: string; email?: string }

export const getTitle = ($slidev: $slidev): string => $slidev.configs.title

export const getAuthors = ($slidev: $slidev): Author[] =>
  $slidev.configs.author
    .split(",")
    .map(i => i.trim())
    .map(i => i.match(/^([^<>]+[^ ]) ?(?:<(.*)>)?$/))
    .filter(i => i !== null)
    .map(i => ({ name: i[1], email: i[2] }))

export const getPublicUrl = ($slidev: $slidev) => $slidev.configs.publicUrl

export const useMetadata = () => {
  const { $slidev } = useSlideContext()

  return computed(
    () =>
      ({
        title: $slidev.configs.title
      }) as const
  )
}
