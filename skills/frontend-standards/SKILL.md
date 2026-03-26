---
name: frontend-standards
description: ryanYan 的前端工程化规范与个人偏好，覆盖 JavaScript、Vue 3、工具链约定与页面模板。适用于讨论前端项目规范、ESLint 与格式化配置、代码组织、Vue 页面骨架、提交前检查、monorepo 规划或 npm 包发布等场景；若需求涉及从 0 初始化项目流程，应配合 `initrepo` skill 使用。
metadata:
  author: ryanYan
  version: "2026.03.26"
---

# Frontend Standards

## 代码规范

### 代码组织

- **单一职责**：单文件只做一件事，输入/输出清晰
- **大文件拆分**：超过维护阈值后按领域或功能分层
- **静态映射下沉**：静态属性、枚举映射、状态字典、列配置等统一抽到模块内的 `config.js`
- **README 策略**：除非用户明确要求，否则不要额外输出 `README.md`

### 注释

- **避免无意义注释**：代码本身应可读
- **只解释 why**：只在意图、权衡或约束不明显时注释；不要解释显而易见的 how

## 页面模板

用于快速起 Vue SFC 页面骨架，默认基于 `my-page` 布局插槽。

```vue
<template>
  <my-page title="" :loading="true">
    <template #searchForm></template>
    <template #buttonGroup></template>
    <template #tableBox></template>
    <template #paginationBox></template>
  </my-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

## 工具链选择

- **包管理器**：统一使用 `pnpm`
- **格式化**：统一使用 `oxfmt`
  - 如果仓库根目录已有 `.oxfmtrc.json`，以它为准；否则使用下面配置作为基线。

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
  "ignorePatterns": [".github", ".husky", ".vscode", "/public/**", "/node_modules/**", "**/*.svg", "**/*.sh"]
}
```

- **代码检查**：统一使用 ESLint Flat Config
  - 若项目使用 `unplugin-auto-import`，配套生成 `.eslintrc-auto-import.json` 并在 ESLint globals 中引入。

```js
import globals from "globals"
import pluginJs from "@eslint/js"
import pluginVue from "eslint-plugin-vue"

import { createRequire } from "module"
const require = createRequire(import.meta.url)
const autoImportConfig = require("./.eslintrc-auto-import.json")

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "no-negated-condition": "off"
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals
      }
    }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      "vue/block-lang": [
        "error",
        {
          script: { lang: "js" }
        }
      ],
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "style"]
        }
      ],
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/no-deprecated-v-on-native-modifier": "off",
      "max-lines": ["error", { max: 500, skipBlankLines: true, skipComments: true }]
    }
  },
  {
    ignores: ["node_modules/*", "dist/*", "public/*", "cli/*", "**/*.min.js"]
  }
]
```

## 与 `initrepo` 的分工

- **本 skill**：定义偏好与规范，例如目录、代码风格、工具链约束和模板
- **`initrepo`**：负责从 0 初始化项目的完整流程，例如脚手架、安装、命令、工程化落地和验收
