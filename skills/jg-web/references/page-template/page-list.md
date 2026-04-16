# pagelist 架构模版

```vue
<template>
  <my-page :title="pageTitle" :loading="loading">
    <template #searchForm>
      <!-- TODO(jg-web): 查询表单 -->
    </template>
    <template #buttonGroup>
      <!-- TODO(jg-web): 顶部操作区（新增/导出/批量操作等） -->
    </template>
    <template #tableBox>
      <!-- TODO(jg-web): 表格主体 -->
    </template>
    <template #paginationBox>
      <!-- TODO(jg-web): 分页 -->
    </template>
  </my-page>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
```
