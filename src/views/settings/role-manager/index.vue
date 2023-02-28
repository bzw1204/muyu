<template>
  <n-space>
    角色管理
    <n-button type="primary" @click="toDetail">详情</n-button>
  </n-space>
</template>

<script setup lang="ts">
  const router = useRouter()
  const toDetail = () => {
    router.push({ path: '/settings/role-manager/detail' })
  }
</script>

<style scoped></style>
