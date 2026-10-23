import tseslint from "typescript-eslint"
import vue from "eslint-plugin-vue"
import eslintConfigPrettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...tseslint.configs.strictTypeChecked,
  ...vue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".vue"]
      }
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: ["dist/**", "eslint.config.ts", "prettier.config.ts"]
  },
  {
    files: ["types/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "vue/require-default-prop": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "vue/multi-word-component-names": "off",
      // SVG path data is numbers in a string: the rest of the rule stays on
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }]
    }
  }
])
