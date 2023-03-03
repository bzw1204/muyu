<template>
  <n-space>
    用户管理
    <n-button @click="toDetail">详情</n-button>
  </n-space>
</template>

<script setup lang="ts">
  const router = useRouter()
  const toDetail = () => {
    router.push({ path: '/settings/user-manager/detail' })
  }
</script>

<style scoped></style>
