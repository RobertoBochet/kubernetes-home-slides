import { defineConfig } from "vite"

export default defineConfig({
  slidev: {
    components: {
      globsExclude: ["./components/{types,utilities,assets}/**"]
    }
  }
})
