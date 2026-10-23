import { defineConfig } from "unocss"

const lightDark = (light: string, dark: string) => ({ light, dark, DEFAULT: `light-dark(${light},${dark})` })

export default defineConfig({
  theme: {
    colors: {
      kubernetes: "#326CE5",
      primary: "#326CE5",
      text: {
        ...lightDark("#000000", "#FFFFFF"),
        secondary: lightDark("#8a8a8a", "#9a9a9a")
      },
      background: {
        ...lightDark("#FFFFFF", "#191919"),
        secondary: lightDark("#e6e6e6", "#202020")
      },
      hairline: lightDark("#c8c8c8", "#4a4a4a")
    }
  },
  rules: [
    [/^bg-secondary$/, (_, { theme }) => ({ "background-color": theme.colors.background.secondary.DEFAULT })],
    [/^color-secondary$/, (_, { theme }) => ({ color: theme.colors.text.secondary.DEFAULT })]
  ]
})
