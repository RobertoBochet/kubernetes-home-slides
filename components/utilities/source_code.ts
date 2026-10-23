import cc0Badge from "../assets/CC0-1.0.svg"
import ccBy4Badge from "../assets/CC-BY-4.0.svg"
import ccBySa4Badge from "../assets/CC-BY-SA-4.0.svg"
import { $slidev, SourceCodeProvider } from "../types"

const licenseData = {
  "CC0-1.0": {
    link: "https://creativecommons.org/publicdomain/zero/1.0/",
    badge: cc0Badge,
    name: "Creative Commons Zero v1.0 Universal"
  },
  "CC-BY-4.0": {
    link: "https://creativecommons.org/licenses/by/4.0/",
    badge: ccBy4Badge,
    name: "Creative Commons Attribution 4.0 International License"
  },
  "CC-BY-SA-4.0": {
    link: "https://creativecommons.org/licenses/by-sa/4.0/",
    badge: ccBySa4Badge,
    name: "Creative Commons Attribution-ShareAlike 4.0 International License"
  }
} as const

const getLicenseID = ($slidev: $slidev) => $slidev.configs.license

export const getLicense = ($slidev: $slidev) => {
  const licenseID = getLicenseID($slidev)
  if (!licenseID) return undefined
  return licenseData[licenseID]
}

const getSourceCodeUrl = ($slidev: $slidev) => $slidev.configs.sourceCode

const computeSourceCodeProvider = (url: string): SourceCodeProvider => {
  if (/(https?:\/\/)?github/.test(url)) return "github"
  if (/(https?:\/\/)?gitlab/.test(url)) return "gitlab"
  if (/(https?:\/\/)?git\.poul\.org/.test(url)) return "gitlab"
  return "generic"
}

export const getSourceCode = ($slidev: $slidev) => {
  const sourceCodeUrl = getSourceCodeUrl($slidev)
  if (!sourceCodeUrl) return undefined

  return {
    url: sourceCodeUrl,
    provider: computeSourceCodeProvider(sourceCodeUrl)
  }
}
