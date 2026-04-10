<template>
  <my-page :title="pageTitle" :loading="loading">
    <!-- TODO(jg-web): 基础信息区 / Tabs / 操作区 -->
  </my-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

const pageTitle = "TODO"
const loading = ref(false)

const detail = ref<any>(null)

async function fetchDetail() {
  loading.value = true
  try {
    // TODO(jg-web): 调用 service / api
  } finally {
    loading.value = false
  }
}

void fetchDetail()
</script>

<style lang="scss" scoped></style>
