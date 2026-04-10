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
