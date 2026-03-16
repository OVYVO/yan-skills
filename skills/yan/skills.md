---
name: ryanYan
description: ryanYan's opinionated tooling and conventions for JavaScript and Vue 3 projects. Use when initializing projects, configuring oxlint/oxfmt standards, quickly adding page templates, setting up monorepo architecture, publishing npm packages, or when the user mentions ryanYan's coding preferences.
metadata:
  author: ryanYan
  version: "2026.03.12"
---

## Coding Practices

### Code Organization

- **Single Responsibility**: Each file should handle a single functional responsibility with clear inputs and outputs
- **Large File Splitting**: Oversized files must be split in a reasonable and clear manner for maintainability
- **Static Properties**: Static properties or enum fields should be maintained in a separate `config.js` file
- **Usage Instructions**: Do not output a `README.md` file unless explicitly requested
- **Feature Module Structure**: When creating a new feature module, follow the file structure below：

```json
src/views/featureName/        # Semantic naming (camelCase)
├── index.vue                 # Entry file
├── components/               # Module-specific components
├── images/                   # Module-specific assets
├── api.js                    # API definitions (single responsibility)
└── config.js                 # Business configuration (column definitions, status mappings)
```

### Comments

- **Avoid unnecessary comments**: Code should be self-explanatory
- **Explain "why" not "how"**: Comments should describe the reasoning or intent, not what the code does

## Page Templates

- **Base Template**: SFC file template：

```vue
<template>
  <my-page title="" :loading="true">
    <template #searchForm> </template>
    <template #buttonGroup> </template>
    <template #tableBox> </template>
    <template #paginationBox> </template>
  </my-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

## Tooling Choice

- **Package Manager**: Always use pnpm
- **Code Formatting**: Use Oxfmt for code formatting with the following configuration:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "trailingComma": "none",
  "singleQuote": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "singleAttributePerLine": false,
  "htmlWhitespaceSensitivity": "ignore",
  "sortPackageJson": false,
  "ignorePatterns": [
    ".github",
    ".husky",
    ".vscode",
    "/public/**",
    "/node_modules/**",
    "**/*.svg",
    "**/*.sh"
  ]
}
```

- **Code Linting**: Always use ESLint with the following `eslint.config.js` configuration:

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const autoImportConfig = require("./.eslintrc-auto-import.json");

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "no-negated-condition": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals,
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      "vue/block-lang": [
        "error",
        {
          script: { lang: "js" },
        },
      ],
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "style"],
        },
      ],
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/no-deprecated-v-on-native-modifier": "off",
      "max-lines": [
        "error",
        { max: 500, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    ignores: ["node_modules/*", "dist/*", "public/*", "cli/*", "**/*.min.js"],
  },
];
```

## References
