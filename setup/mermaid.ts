import { defineMermaidSetup } from "@slidev/types"

export default defineMermaidSetup(() => ({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "neutral",
  themeCSS: "neutral",
  themeVariables: {
    darkMode: true,
    background: "#242423",
    primaryColor: "#FCC500",
    secondaryColor: "#5B7284",
    git0: "#FCC500",
    git1: "#5B7284",
    gitBranchLabel0: "#242423",
    gitBranchLabel1: "#FFFFFF",
    gitInv0: "#FC4700",
    gitInv1: "#FC4700",
    gitInv2: "#FC4700",
    gitInv4: "#FC4700",
    gitInv5: "#FC4700",
    gitInv6: "#FC4700",
    gitInv7: "#FC4700",
    fontFamily: "Source Sans Pro",
    commitLabelColor: "#FFFFFF",
    commitLabelBackground: "#50504f",
    tagLabelColor: "#000000",
    tagLabelBackground: "#b1b1b1",
    tagLabelBorder: "#000000",
    treeView: {
      labelColor: "var(--slidev-theme-text-color)",
      lineColor: "var(--slidev-theme-hairline-color)",
      iconColor: "var(--slidev-theme-text-secondary-color)"
    }
  },
  gitGraph: { useMaxWidth: false },
  treeView: {
    showIcons: true,
    rowIndent: 16,
    paddingY: 1
  }
}))
