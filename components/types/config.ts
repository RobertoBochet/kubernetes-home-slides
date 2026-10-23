import { CreditEntry } from "./credits"
import { LicenseID } from "./license"

export interface Config {
  credits?: CreditEntry[]
  license?: LicenseID
  sourceCode?: string
  publicUrl?: string
}
