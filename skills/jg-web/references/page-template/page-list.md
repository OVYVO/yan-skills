# pagelist 架构模版

## 目标

- **默认布局**：使用 `my-page` 作为页面容器，通过 `searchForm / buttonGroup / tableBox / paginationBox` 四个插槽组织结构
- **默认能力**：查询、重置、表格展示、分页请求（`pageNum/pageSize/totalNum`）
- **片段来源**：`Cursor Snippets`（`pageCode.code-snippets`）中的可复制代码块

## Snippets 触发前缀（建议直接在编辑器输入）

- **`yan-page-lay`**：列表页 `my-page` 插槽布局
- **`yan-page-searchform`**：查询/重置按钮区（Element Plus 表单）
- **`yan-page-vxe`**：`vxe-table` 表格骨架（含序号列）
- **`yan-page-pagination`**：`my-pagination` 分页组件绑定与回调

## 页面骨架（模板）

```vue
<template>
  <my-page :title="pageTitle" :loading="loading">
    <template #searchForm>
      <!-- 查询表单 -->
    </template>
    <template #buttonGroup>
      <!-- 顶部操作区（新增/导出/批量操作等） -->
    </template>
    <template #tableBox>
      <!-- 表格主体 -->
    </template>
    <template #paginationBox>
      <!-- 分页 -->
    </template>
  </my-page>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
```

## Script 侧必备状态与方法（落地约定）

> 下面是配合上述四个插槽最常用的一组“必须项”。你可以按业务增删字段，但建议保留命名以便团队统一与复用。

- **状态**
  - `pageTitle: string`：页面标题（绑定到 `my-page`）
  - `loading: boolean`：页面 loading（接口请求期间置 `true`）
  - `queryForm: { pageNum: number; pageSize: number; ... }`：查询条件与分页入参
  - `totalNum: number`：总条数（分页组件 `:totalNum`）
  - `tableData: any[]`：表格数据源（`vxe-table :data`）
- **方法**
  - `getList()`：核心请求函数（被分页组件 `@getList` 触发）
  - `searchList()`：查询按钮触发（通常 `pageNum = 1` 后再 `getList()`）
  - `resetSearch()`：重置按钮触发（清空查询条件，`pageNum = 1` 后再 `getList()`）

## 插槽填充规范（推荐）

### `searchForm`

- **推荐用片段**：`yan-page-searchform`
- **关键点**
  - 查询按钮绑定 `@click="searchList"`
  - 重置按钮绑定 `@click="resetSearch"`
  - 若有表单字段，建议用 `queryForm` 承载（与分页入参同对象，便于 `getList` 直接透传）

### `buttonGroup`

- **用途**：新增/导入/导出/批量操作等
- **建议**：按钮事件尽量调用独立方法，避免在模板中写复杂表达式；批量操作需要明确“未选择时”的禁用态与提示

### `tableBox`

- **推荐用片段**：`yan-page-vxe`
- **关键点**
  - 表格数据统一用 `tableData`
  - 序号列优先保留：`<vxe-column type="seq" title="序号" width="58" />`
  - 列字段（`field`）建议与后端返回保持一致；复杂映射优先下沉到 `config.ts`

### `paginationBox`

- **推荐用片段**：`yan-page-pagination`
- **关键点**
  - `v-model:pageNum="queryForm.pageNum"`
  - `v-model:pageSize="queryForm.pageSize"`
  - `:totalNum="totalNum"`
  - `@getList="getList"`（分页变化统一走同一个请求函数）
