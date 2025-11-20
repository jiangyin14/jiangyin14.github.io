import js from "@eslint/js"
import vue from "eslint-plugin-vue"

export default [
  { ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.vitepress/**",
      "**/.vitepress/dist/**",
      ".cache",
      "auto-imports.d.ts",
      "components.d.ts",
    ] },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        URL: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        MediaMetadata: "readonly",
        ClipboardItem: "readonly",
        fetch: "readonly",
        process: "readonly",
        Buffer: "readonly",
      },
    },
    rules: {
      quotes: ["warn", "double"],
      "import/extensions": "off",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "no-undef": "off",
      "vue/multi-word-component-names": "off",
    },
  },
]