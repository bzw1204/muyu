<template>
  <div>
    <n-space>
      用户管理
      <n-button @click="toDetail">详情</n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const toDetail = () => {
    router.push({ path: '/settings/role-manager/detail' })
  }
</script>

<style scoped></style>
