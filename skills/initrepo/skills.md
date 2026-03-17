---
name: initrepo
description: 初始化前端项目的标准流程（脚手架→依赖→规范→目录结构→提交）。当用户要“新建/初始化前端项目”“搭建 Vite / Vue3 / React / Nuxt 项目”“从 0 配一套 ESLint/格式化/Husky”“创建项目模板/脚手架”“统一工程化规范”时务必触发并按步骤执行；即使用户没点名 initrepo，只要在讨论项目初始化与工程化落地，也应使用本 skill。
metadata:
  author: ryanYan
  version: "2026.03.16"
---

## 目标

把“新建一个可长期维护的前端项目”变成稳定、可重复的流程：**脚手架选择** → **依赖与运行** → **代码规范（lint/format）** → **Git 钩子与提交规范** → **基础目录结构与约定**。

## 使用前快速决策（不要发散）

优先用下面 3 套模板之一：

- **Vue 3 + Vite（默认）**：大多数中后台/工具站点
- **Nuxt（Vue 全栈/SSR/SEO）**：需要 SSR、路由约定、全栈接口
- **React + Vite**：团队/生态偏 React

如果用户没有明确技术栈，按下面规则默认：

- 需要 SSR/SEO/全栈路由约定 → **Nuxt**
- 否则 → **Vue 3 + Vite**

## 统一约定（所有模板都遵守）

- **包管理器**：统一使用 `pnpm`
- **Node**：建议 LTS；如果要固定版本，使用 `.nvmrc` 或 `volta`（二选一，避免重复，优先使用`.nvmrc`）
- **命名**：
  - 包名：`kebab-case`
  - 目录：`kebab-case` 或 `camelCase`（同项目统一）
  - 组件：Vue 用 `PascalCase`，React 组件文件用 `PascalCase.tsx`

## 模板 A：Vue 3 + Vite（默认）

### 1) 创建项目

在目标目录执行：

```bash
pnpm create vite <project-name> --template vue
cd <project-name>
pnpm install
pnpm dev
```

如果你明确要 TypeScript：

```bash
pnpm create vite <project-name> --template vue-ts
```

### 1.1) 对齐 `jg-pmg-centralized-control-web-v2` 的整体架构（推荐）

核心思想：把“工程化与构建逻辑”从 `vite.config.js` 里拆出来，集中到 `cli/` 目录，形成可复用的 CLI/工作流层。

- **新增 `cli/` 作为工程中枢**（建议直接照该项目结构落目录）：

```text
cli/
  env/              # 统一放多环境 .env 文件（不放在项目根）
  vite/             # Vite 配置拆分：plugins/build/css 等
  workflow/         # 生产工作流（串联 lint/stylelint/build 等）
  script/           # 辅助脚本（版本检查、同步、打包等）
  polyfill/         # 需要的话放 polyfill
```

- **`vite.config.js` 变薄**：只做三件事

  - `envDir` 指向 `cli/env`
  - `plugins/build/css` 从 `cli/vite/index.js` 统一暴露（例如 `vitePlugins`/`viteBuild`/`viteCss`）
  - `mode` 决定 `outDir`（如 `./dist/<mode>`），形成可追溯的构建产物结构

- **多环境约定（mode 驱动）**：
  - `dev` 使用固定 mode（例如 `beta`）并开启 `--host`
  - `build:*` 用不同 mode 输出到不同目录（例如 `develop/test/online`）

### 2) 基础工程化（建议最小可用集）

最小集包含：**ESLint + 格式化 + 提交/钩子**。如果项目很小，也不要跳过 ESLint 与格式化。

- 依赖建议（贴近 `jg-pmg-centralized-control-web-v2`）：
  - ESLint（Flat config）+ `eslint-plugin-vue`
  - 格式化：`oxfmt`
  - 样式：`stylelint`（如果项目有 SCSS/Vue SFC 样式）
  - Git hooks：`husky` + `lint-staged`
  - 提交规范：`commitlint`

执行原则：

- 先让 `pnpm lint` / `pnpm format` / `pnpm stylelint`（按需）能跑起来
- 再接入 `lint-staged`，保证提交前自动修复（eslint/stylelint）+ 格式化（oxfmt）
- 提交消息用 `commitlint` 做底线校验（团队若用 gitmoji，可在 `commit-msg` 钩子里先清洗前缀再校验）

### 3) 目录结构（建议）

```js
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
└── workers/          # 有 Web Worker 场景再启用
```

### 4) views 单个功能模块目录结构（建议）

```js
src/views/featureName/        # 语义化命名（驼峰/短横线）
├── index.vue                 # 入口文件
├── components/               # 模块私有组件？
├── images/                   # 模块私有资源
├── api.js                    # 接口定义（单一职责）
└── config.js                 # 业务配置（列定义、状态映射）
```

### 5) 路径别名

统一 `@` → `src`，并按需补充 `@utils` → `src/utils`。确保 TS（如使用）与 Vite 配置同时生效。

## 模板 B：Nuxt（Vue 全栈/SSR）

### 1) 创建项目

```bash
pnpm dlx nuxi init <project-name>
cd <project-name>
pnpm install
pnpm dev
```

### 2) 工程化建议

- Nuxt 自带较多约定（目录路由、模块系统），不要把 Vite 项目的复杂目录结构原样搬过来
- 同样接入：ESLint + 格式化 + husky/lint-staged（保持一致性）

### 3) 目录结构（建议）

```text
app/
components/
composables/
pages/
server/            # Nitro server routes
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

同样落地：ESLint + 格式化 + husky/lint-staged。

## Git 与提交（所有模板）

### 1) 初始化 Git

如果脚手架未初始化：

```bash
git init
```

### 2) 提交规范（建议）

如果团队没规定，建议使用 Conventional Commits：

- `feat:` 新功能
- `fix:` 修复
- `chore:` 杂项/工程化
- `docs:` 文档
- `refactor:` 重构
- `test:` 测试

### 3) 提交前检查（建议）

- 目标：每次提交至少通过 `pnpm lint`，并自动格式化改动文件

## 交付清单（完成即算成功）

最终必须满足：

- 可以 `pnpm install`、`pnpm dev` 正常启动
- 有明确的 `pnpm lint` 与 `pnpm format`（或等价命令）
- 提交时会触发 `lint-staged`（至少格式化、可选 lint）
- 有 `@` 别名（如使用 TS）
- 有一份稳定的目录结构约定

## 常见坑（快速排查）

- **pnpm 未启用**：确认 `pnpm -v`；必要时启用 corepack
- **别名只配了一处**：TS/Vite/Nuxt 的别名需要同时一致
- **lint/format 互相打架**：优先统一工具栈；不要同时“强制”两套格式化规则
