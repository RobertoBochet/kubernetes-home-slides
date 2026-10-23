import "@slidev/types"
import { Config } from "./config"

declare module "@slidev/types" {
  interface SlidevConfig extends Config {}
}
