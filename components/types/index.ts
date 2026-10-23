import { useSlideContext } from "@slidev/client"

export type $slidev = ReturnType<typeof useSlideContext>["$slidev"]

export * from "./credits"
export * from "./license"
export * from "./source-code"
export * from "./config"
