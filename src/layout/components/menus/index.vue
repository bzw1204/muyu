<template>
  <n-layout-sider
    :collapsed="collapsed"
    collapse-mode="width"
    :collapsed-width="collapsedWidth"
    :width="210"
    show-trigger="bar"
    :content-style="{ height: '100vh' }"
    bordered
    @update:collapsed="handleCollapsed"
  >
    <n-space vertical>
      <!-- Logo -->
      <Logo :collapsed="collapsed" />
      <!-- 菜单 -->
      <n-menu
        v-model:value="activeKey"
        accordion
        :indent="18"
        :collapsed="collapsed"
        :collapsed-width="collapsedWidth"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :expanded-keys="expandedKeys"
        @update:expanded-keys="handleExpandedKeys"
      />
    </n-space>
  </n-layout-sider>
</template>

<script lang="ts" setup name="MuMenus">
  import { generatorMenu } from '@/utils/router-utils'
  import Logo from './components/logo/index.vue'

  const { collapsed, collapsedWidth } = storeToRefs(useSettingStore())
  const activeKey = ref('')
  const expandedKeys = ref<string[]>([])
  const handleCollapsed = (value: boolean) => (collapsed.value = value)
  const route = useRoute()
  const routes =
    useRouter()
      .getRoutes()
      .find((x) => x.path === '/')?.children || []

  const menuOptions = generatorMenu(routes)
  const handleExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys
  }
  watchEffect(() => {
    const matched = route.matched
    activeKey.value = matched[matched.length - 1].path
    document.title = matched[matched.length - 1].meta.name as string
    expandedKeys.value = matched.map((x) => x.path)
  })
</script>

<style scoped></style>
