<template>
  <div class="mu-logo">
    <img src="@/assets/logo.svg" alt="logo" />
    <span class="title">{{ title || '沐雨' }}</span>
  </div>
</template>

<script setup lang="ts" name="MuLogo">
  const props = defineProps<{ collapsed: boolean; title?: string }>()
  const width = ref<string | number>('100%')
  const paddingLeft = ref('16px')
  watchEffect(() => {
    if (props.collapsed) {
      width.value = 0
      paddingLeft.value = '8px'
    } else {
      width.value = '100%'
      paddingLeft.value = '16px'
    }
  })
</script>

<style scoped lang="less">
  .mu-logo {
    display: grid;
    grid-template-areas: 'icon content';
    grid-template-columns: auto 1fr auto;
    align-items: center;
    width: 100%;
    height: 44px;
    padding-left: v-bind(paddingLeft);
    transition: background-color 0.3s var(--n-bezier), padding-left 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    img {
      grid-area: icon;
      width: 28px;
      height: 28px;
    }
    .title {
      grid-area: content;
      display: inline-block;
      width: v-bind(width);
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 10px;
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
    }
  }
</style>
