---
name: initrepo
description: 用于初始化可长期维护的前端项目，覆盖脚手架选择、依赖安装、Lint 与格式化、Git Hooks、目录约定与验收清单。适用于创建 Vue、Nuxt、React 前端项目，或梳理项目初始化与工程化落地流程的场景。
metadata:
  author: ryanYan
  version: "2026.03.26"
---

# Initrepo

## 目标

把“新建一个可长期维护的前端项目”变成稳定、可重复的流程：**脚手架选择** → **依赖与运行** → **代码规范** → **Git 钩子与提交规范** → **基础目录结构与约定**。

## 使用前快速决策

优先用下面 3 套模板之一：

- **Vue 3 + Vite（默认）**：大多数中后台和工具站点
- **Nuxt**：需要 SSR、SEO 或全栈路由约定
- **React + Vite**：团队或生态偏 React

如果用户没有明确技术栈，按下面规则默认：

- 需要 SSR、SEO 或全栈路由约定时选择 **Nuxt**
- 否则默认 **Vue 3 + Vite**

## 统一约定

- **包管理器**：统一使用 `pnpm`
- **Node**：建议使用 LTS；若要固定版本，优先使用 `.nvmrc`
- **命名**：
  - 包名使用 `kebab-case`
  - 目录统一使用 `kebab-case` 或 `camelCase`
  - Vue 组件使用 `PascalCase`，React 组件文件使用 `PascalCase.tsx`

## 模板 A：Vue 3 + Vite

### 1) 创建项目

```bash
pnpm create vite <project-name> --template vue
cd <project-name>
pnpm install
pnpm dev
```

如果明确要 TypeScript：

```bash
pnpm create vite <project-name> --template vue-ts
```

### 1.1) 对齐 CLI 中枢架构

核心思想：把工程化与构建逻辑从 `vite.config.js` 中拆出来，集中到 `cli/` 目录。

```text
cli/
  env/
  vite/
  workflow/
  script/
  polyfill/
```

`vite.config.js` 只保留三件事：

- `envDir` 指向 `cli/env`
- 从 `cli/vite/index.js` 暴露 plugins、build 和 css 配置
- 根据 `mode` 生成可追溯的 `outDir`

### 2) 基础工程化

最小集包含：**ESLint + 格式化 + 提交钩子**。

- ESLint Flat Config + `eslint-plugin-vue`
- 格式化使用 `oxfmt`
- 样式检查按需使用 `stylelint`
- Git hooks 使用 `husky` + `lint-staged`
- 提交规范使用 `commitlint`

执行原则：

- 先让 `pnpm lint`、`pnpm format`、`pnpm stylelint` 能跑起来
- 再接入 `lint-staged`，保证提交前自动修复和格式化
- 最后用 `commitlint` 做提交消息校验

### 3) 目录结构

```text
src/
├── api/
├── assets/
├── components/
├── directives/
├── hooks/
├── layout/
├── plugin/
├── router/
├── service/
├── store/
├── style/
├── utils/
├── views/
└── workers/
```

### 4) 单个功能模块结构

```text
src/views/featureName/
├── index.vue
├── components/
├── images/
├── api.js
└── config.js
```

### 5) 路径别名

统一 `@` 指向 `src`，并确保 TS 与 Vite 配置同步。

## 模板 B：Nuxt

### 1) 创建项目

```bash
pnpm dlx nuxi init <project-name>
cd <project-name>
pnpm install
pnpm dev
```

### 2) 工程化建议

- Nuxt 自带较多目录约定，不要机械照搬 Vite 项目结构
- 同样接入 ESLint、格式化和 husky/lint-staged，保持流程一致

### 3) 目录结构

```text
app/
components/
composables/
pages/
server/
utils/
```

## 模板 C：React + Vite

### 1) 创建项目

```bash
pnpm create vite <project-name> --template react-ts
cd <project-name>
pnpm install
pnpm dev
```

### 2) 工程化同上

同样落地 ESLint、格式化和 husky/lint-staged。

## Git 与提交

### 1) 初始化 Git

如果脚手架未初始化：

```bash
git init
```

### 2) 提交规范

如果团队没规定，建议使用 Conventional Commits：

- `feat:` 新功能
- `fix:` 修复
- `chore:` 杂项或工程化
- `docs:` 文档
- `refactor:` 重构
- `test:` 测试

### 3) 提交前检查

- 目标：每次提交至少通过 `pnpm lint`，并自动格式化改动文件

## 交付清单

最终必须满足：

- 可以 `pnpm install` 和 `pnpm dev` 正常启动
- 有明确的 `pnpm lint` 与 `pnpm format`
- 提交时会触发 `lint-staged`
- 有 `@` 别名
- 有一份稳定的目录结构约定

## 常见坑

- **pnpm 未启用**：确认 `pnpm -v`；必要时启用 corepack
- **别名只配了一处**：TS、Vite、Nuxt 的别名要保持一致
- **lint 与 format 打架**：优先统一工具栈，不要同时强制两套格式化规则
