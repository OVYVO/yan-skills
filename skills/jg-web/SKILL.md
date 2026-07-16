---
name: jg-web
description: jg 公司 Web 日常开发编码风格与页面模板（Vue 3 + Vite）。适用于新建页面骨架、抽离模块结构、统一 service/composables 写法、沉淀可复制代码片段与自检清单；当你需要把“团队习惯”变成稳定可复用的输出时使用。
metadata:
  author: ryanYan
  version: "2026.04.10"
  argument-hint: <需求描述> 或 <页面类型(列表/详情/表单)> 或 <要改造的文件路径/片段>
---

# JG Web (Vue 3 + Vite)

## 适用范围与触发

在以下场景优先使用本 skill：

- **新建页面**：需要快速生成列表页/详情页/表单页的 Vue SFC 骨架，并对齐模块结构与命名
- **抽离与重构**：把页面中的“静态配置/映射/接口层/复用逻辑”下沉到更合适的模块
- **代码统一**：统一 api 调用、错误处理、loading/空状态、表单与表格的常见模式
- **交付前自检**：按清单快速检查边界、类型、性能与可维护性风险

如果用户未明确页面类型，默认按 **“查询 + 表格 + 分页”列表页** 输出骨架。

## 基础约定（命名 / 目录 / 导入 / 注释）

### 命名

- **模块目录**：放置在 `src/views/<featureName>/`（`featureName` 使用 `camelCase` 命名风格）
- **模块入口文件**：统一使用 `index.vue` 命名（一个功能模块仅能存在一个入口文件）
- **模块静态映射与配置文件**：统一使用 `config.ts` 或 `config.js` 命名（以项目既有习惯为准）
- **模块 api 请求文件**：统一使用 `api.ts` 或 `api.js` 命名（以项目既有习惯为准）
- **模块 ts 类型文件**：统一使用 `type.d.ts` 命名 （如果使用 ts）
- **模块组件文件夹**：统一使用 `components` 命名，文件夹内文件使用 `camelCase` 命名风格

### 代码组织

- **单文件单一职责**：页面只编排视图与交互；复用逻辑进 `hooks/`
- **静态配置下沉**：状态字典、枚举映射抽到 `config.ts` 或 `config.js`（已以项目既有习惯为准）
- **接口请求下沉**：所有 api 请求方法抽到 `api.ts` 或 `api.js`（已以项目既有习惯为准）
- **避免大组件**：当页面代码超出可维护阈值（通常会在 eslint 中配置 max-lines，如果没有按照 `500` 行为拆分标准）优先拆分子组件/抽 hooks
- **子组件维护**：子组件统一放在同模块下的 `components` 文件夹内，子组件需要满足“单一职责”原则

### 导入顺序（建议）

建议按下面顺序组织 import（保持稳定可扫描）：

1. 第三方库
2. 项目内基础设施（`@/utils`、`@/public`、`@/api`）
3. 当前模块内（`./config`、`./components/*`、 `./api`、 `./type.d.ts`）

### Auto Import（重要）

默认项目会引入 `unplugin-auto-import/vite`，因此在编写代码时 **不需要** 手动添加以下内容的 import：

- **自动导入来源**：
  - `vue`
  - `vue-router`
  - `element-plus`: `ElMessage` / `ElMessageBox` / `ElNotification`
- **自动导入目录**：`src/hooks` / `src/components` / `src/directives`

输出代码片段/模板时，若使用到以上 API，优先直接使用（不额外写 `import { ref } from "vue"` 这类导入）。

同时确保 ESLint 已读取 `./.eslintrc-auto-import.json`（由 auto-import 插件生成）以避免 globals 报错。

### 注释

- **只写 why**：只在意图、权衡或约束不明显时写注释
- **避免叙述式注释**：不要注释显而易见的流程（例如“这里发请求”“这里设置 loading”）

## 页面模板（Vue SFC）

### A. 列表页（查询 + 表格 + 分页）骨架

> 说明：下面以你仓库既有的 `my-page` 插槽模式作为默认。若你们项目不使用该布局组件，将 `my-page` 替换为项目的页面容器即可。

- 模板文件：`skills/jg-web/references/page-template/page-list.md`
- 使用方式：适合快速搭建常规“搜索 + 列表 +分页”页面。

### B. 详情页骨架

- 模板文件：`skills/jg-web/references/page-template/page-detail.vue`
- 使用方式：复制该文件内容到 `src/views/<featureName>/components/detailForm.vue`，并按路由参数补齐 `fetchDetail` 入参。

### C. 模块目录结构（建议）

- 参考文件：`skills/jg-web/references/page-template/module-structure.txt`

### D. 搜索表单页骨架（表单 + 结果区）

- 模板文件：`skills/jg-web/references/page-template/page-search-form.vue`
- 使用方式：适合“只有搜索表单 + 结果展示”的页面；如结果是列表，可直接替换为列表页模板并启用分页。

## 常用代码片段（可复制）

### 1) 静态映射与表格列配置下沉到 `config.ts`

- 片段文件：`skills/jg-web/references/code-snippets/config.ts`

### 2) service 调用约定（占位）

- 片段文件：`skills/jg-web/references/code-snippets/service.md`

### 3) composable 抽离模板（占位）

- 片段文件：`skills/jg-web/references/code-snippets/useFeature.ts`

## 交付前自检清单（快速）

- **功能边界**：空数据、接口失败、分页边界（最后一页/空页）是否可用
- **状态一致性**：loading 的开启/关闭是否覆盖异常路径；是否有并发请求覆盖问题
- **可维护性**：静态映射/列配置是否已下沉到 `config.ts`；页面是否过长需要拆分
- **类型**：关键入参/返回是否有类型；避免无意义的 `any` 扩散
- **性能**：高频计算是否放在 `computed`；列表渲染是否避免不必要的深层 watch

## 附录（可扩展）

> references（页面模板拆分维护）：
>
> - `references/page-template/page-list.vue`
> - `references/page-template/page-detail.vue`
> - `references/page-template/page-search-form.vue`
> - `references/page-template/module-structure.txt`
>
> references（常用代码片段拆分维护）：
>
> - `references/code-snippets/config.ts`
> - `references/code-snippets/useFeature.ts`
> - `references/code-snippets/service.md`
