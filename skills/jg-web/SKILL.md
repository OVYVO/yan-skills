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

- **新建页面**：需要快速生成列表页/详情页/表单页的 Vue SFC 骨架，并对齐团队结构与命名
- **抽离与重构**：把页面中的“静态配置/映射/列配置/接口层/复用逻辑”下沉到更合适的模块
- **代码统一**：统一 service 调用、错误处理、loading/空态、表单与表格的常见模式
- **交付前自检**：按清单快速检查边界、类型、性能与可维护性风险

如果用户未明确页面类型，默认按 **“查询 + 表格 + 分页”列表页** 输出骨架。

## 基础约定（命名 / 目录 / 导入 / 注释）

### 命名

- **目录**：`kebab-case`
- **Vue 组件**：`PascalCase`（组件文件名与组件名一致）
- **页面/路由模块目录**：`src/views/<featureName>/`（`featureName` 建议 `camelCase` 或 `kebab-case`，以项目既有风格为准）
- **静态映射与配置**：统一放在同模块下的 `config.ts`
- **接口层**：同模块下 `api.ts` 或 `service.ts`（以项目既有习惯为准）

### 代码组织

- **单文件单一职责**：页面只编排视图与交互；复用逻辑进 `composables/` 或 `hooks/`
- **静态配置下沉**：列配置、状态字典、枚举映射、表单 schema 等尽量抽到 `config.ts`
- **避免大组件**：当页面代码超出可维护阈值（例如 \(> 400\) 行）优先拆分子组件/抽 composable

### 导入顺序（建议）

建议按下面顺序组织 import（保持稳定可扫描）：

1. Vue 生态（`vue` / `vue-router` / `pinia`）
2. 第三方库
3. 项目内基础设施（`@/utils`、`@/service`、`@/api`）
4. 当前模块内（`./config`、`./components/*`）

### 注释

- **只写 why**：只在意图、权衡或约束不明显时写注释
- **避免叙述式注释**：不要注释显而易见的流程（例如“这里发请求”“这里设置 loading”）

## 页面模板（Vue SFC）

### A. 列表页（查询 + 表格 + 分页）骨架

> 说明：下面以你仓库既有的 `my-page` 插槽模式作为默认。若你们项目不使用该布局组件，将 `my-page` 替换为项目的页面容器即可。

- 模板文件：`skills/jg-web/references/page-list.vue`
- 使用方式：复制该文件内容到 `src/views/<featureName>/index.vue`，再按项目组件库补齐 search/table/pagination 具体实现。

### B. 详情页骨架

- 模板文件：`skills/jg-web/references/page-detail.vue`
- 使用方式：复制该文件内容到 `src/views/<featureName>/index.vue`，并按路由参数补齐 `fetchDetail` 入参。

### C. 模块目录结构（建议）

- 参考文件：`skills/jg-web/references/module-structure.txt`

### D. 搜索表单页骨架（表单 + 结果区）

- 模板文件：`skills/jg-web/references/page-search-form.vue`
- 使用方式：适合“只有搜索表单 + 结果展示”的页面；如结果是列表，可直接替换为列表页模板并启用分页。

## 常用代码片段（可复制）

### 1) 静态映射与表格列配置下沉到 `config.ts`

```ts
// config.ts
export const StatusText: Record<number, string> = {
  0: "禁用",
  1: "启用"
}

export function formatStatus(status?: number) {
  if (status === undefined || status === null) return "-"
  return StatusText[status] ?? `未知(${status})`
}

export type TableColumn = {
  key: string
  title: string
  width?: number
}

export const columns: TableColumn[] = [
  { key: "name", title: "名称" },
  { key: "status", title: "状态", width: 120 }
]
```

### 2) service 调用约定（占位）

> TODO(jg-web)：根据你们的请求库（axios/fetch 封装）、返回结构（`{ list, total }` / `data` 包裹等）补齐示例。

建议最少明确：

- **函数命名**：`fetchXxxList` / `fetchXxxDetail` / `createXxx` / `updateXxx` / `deleteXxx`
- **参数结构**：列表请求参数统一为 `{ ...query, page, pageSize }`
- **错误处理**：失败是否 toast、是否吞错、是否需要区分业务码

### 3) composable 抽离模板（占位）

```ts
// composables/useFeature.ts
import { computed, reactive, ref } from "vue"

export function useFeature() {
  const loading = ref(false)

  const query = reactive({
    // TODO(jg-web)
  })

  const params = computed(() => ({
    ...query
  }))

  async function run() {
    loading.value = true
    try {
      // TODO(jg-web)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    query,
    params,
    run
  }
}
```

## 交付前自检清单（快速）

- **功能边界**：空数据、接口失败、分页边界（最后一页/空页）是否可用
- **状态一致性**：loading 的开启/关闭是否覆盖异常路径；是否有并发请求覆盖问题
- **可维护性**：静态映射/列配置是否已下沉到 `config.ts`；页面是否过长需要拆分
- **类型**：关键入参/返回是否有类型；避免无意义的 `any` 扩散
- **性能**：高频计算是否放在 `computed`；列表渲染是否避免不必要的深层 watch

## 附录（可扩展）

> TODO(jg-web)：你可以按需要在同目录添加更多文档并从这里链接，例如：
>
> - `snippets/service.md`
> - `snippets/table.md`
>
> references（页面模板拆分维护）：
>
> - `references/page-list.vue`
> - `references/page-detail.vue`
> - `references/page-search-form.vue`
> - `references/module-structure.txt`
