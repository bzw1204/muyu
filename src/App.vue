<template>
  <n-config-provider :theme="getTheme">
    <RouterView />
  </n-config-provider>
</template>

<script setup lang="ts">
  const { getTheme } = storeToRefs(useSettingStore())
</script>

<style scoped></style>
