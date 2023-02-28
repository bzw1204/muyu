<template>
  <div>详情</div>
  <n-button color="#ff69b4" @click="goBack">返回</n-button>
</template>

<script setup lang="ts">
  const router = useRouter()
  const goBack = () => {
    router.push({ path: '/settings/role-manager' })
  }
</script>

<style scoped></style>
