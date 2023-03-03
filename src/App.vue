<template>
  <n-config-provider :theme="getTheme">
    <RouterView />
  </n-config-provider>
</template>

<script setup lang="ts">
  import { IconProvider } from '@icon-space/vue-next'
  import '@icon-space/vue-next/styles/index.css'

  IconProvider({
    size: '1em',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    rtl: false,
    theme: 'outline',
    colors: {
      outline: {
        fill: '#F0F',
        background: 'transparent'
      },
      filled: {
        fill: '#666',
        background: '#FFF'
      },
      twoTone: {
        fill: '#F0F',
        twoTone: '#63e2b7'
      },
      multiColor: {
        outStrokeColor: '#666',
        outFillColor: '#63e2b7',
        innerStrokeColor: '#FFF',
        innerFillColor: '#43CCF8'
      }
    },
    prefix: 'icon'
  })
  const { getTheme } = storeToRefs(useSettingStore())
</script>

<style scoped></style>
