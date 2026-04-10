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

<script setup lang="ts">
import { computed, reactive, ref } from "vue"

const pageTitle = "TODO"

const loading = ref(false)
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

const query = reactive({
  // TODO(jg-web): 查询条件
})

const tableRows = ref<any[]>([])

const requestParams = computed(() => ({
  ...query,
  page: pagination.page,
  pageSize: pagination.pageSize
}))

async function fetchList() {
  loading.value = true
  try {
    // TODO(jg-web): 调用 service / api
    // const res = await fetchXxx(requestParams.value)
    // tableRows.value = res.list
    // pagination.total = res.total
  } finally {
    loading.value = false
  }
}

function resetQuery() {
  // TODO(jg-web): 重置 query（按你们表单控件行为补充）
  pagination.page = 1
  void fetchList()
}

function onPageChange(page: number) {
  pagination.page = page
  void fetchList()
}

function onPageSizeChange(pageSize: number) {
  pagination.pageSize = pageSize
  pagination.page = 1
  void fetchList()
}

void fetchList()
</script>

<style lang="scss" scoped></style>
