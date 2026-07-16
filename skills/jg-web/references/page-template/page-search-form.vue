<template>
  <my-page :title="pageTitle" :loading="loading">
    <template #searchForm>
      <!-- TODO(jg-web): 搜索表单（按项目组件库补齐） -->
      <!--
      示例结构建议：
      - 输入项：关键字/编号/日期范围/状态 等
      - 操作项：查询/重置
      -->
    </template>

    <template #buttonGroup>
      <!-- TODO(jg-web): 可选操作区（导出/复制/批量等） -->
    </template>

    <template #tableBox>
      <!-- TODO(jg-web): 结果区（可用表格/卡片/详情面板替换） -->
    </template>
  </my-page>
</template>

<script setup lang="ts">
const pageTitle = "TODO";
const loading = ref(false);
const form = reactive({
  keyword: "",
  // TODO(jg-web): 其他字段（如日期范围、状态等）
});

const params = computed(() => ({
  ...form,
}));

const result = ref<any>(null);

async function onSearch() {
  loading.value = true;
  try {
    // TODO(jg-web): 调用 service / api
    // const res = await fetchXxx(params.value)
    // result.value = res
  } finally {
    loading.value = false;
  }
}

function onReset() {
  form.keyword = "";
  // TODO(jg-web): 重置其他字段
  result.value = null;
}
</script>

<style lang="scss" scoped></style>
