import type { Config } from "prettier"

export default {
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  printWidth: 120,
  tabWidth: 2,
  arrowParens: "avoid",
  useTabs: false,
  overrides: [
    {
      files: ["slides.md", "slides/*.md"],
      options: {
        parser: "slidev",
        plugins: ["prettier-plugin-slidev"]
      }
    }
  ]
} satisfies Config
