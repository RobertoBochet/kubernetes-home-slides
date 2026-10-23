import { defineAppSetup } from "@slidev/types"
import QrCode from "../components/qr-code.vue"

export default defineAppSetup(({ app }) => {
  app.component("QRCode", QrCode)
})
