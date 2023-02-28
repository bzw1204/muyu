<template>
  <n-layout-header ref="headerRef" bordered>
    <div class="w-full h-44px flex justify-between items-center py-5px px-10px gap-x-20px">
      <div class="flex-1 h-full flex justify-start items-center gap-x-10px">
        <n-button
          size="small"
          text
          :color="textColor"
          :render-icon="() => (collapsed ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined))"
          @click="settingStore.toggleCollapsed"
        />
        <!-- 面包屑 -->
        <MuBreadcrumb />
      </div>
      <div class="h-full flex justify-start items-center --n-test">
        <n-button text :color="textColor" :render-icon="() => (theme === 'light' ? h(Moon) : h(Sunny))" @click="settingStore.toggleTheme">
          {{ theme === 'light' ? '暗色' : '亮色' }}
        </n-button>
      </div>
      <div class="h-full flex justify-between items-center gap-x-10px" :wrap="false" align="center">
        <n-avatar round :size="32" :src="avatar" />
        <n-dropdown placement="bottom-end" trigger="click" size="small" :options="options">
          <n-button text :color="textColor">{{ userName }}</n-button>
        </n-dropdown>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts" name="MuHeader">
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@vicons/antd'
  import { Exit, Moon, Sunny, Body } from '@vicons/ionicons5'
  import MuBreadcrumb from '../breadcrumb/index.vue'
  import { h } from 'vue'

  const settingStore = useSettingStore()
  const { collapsed, theme } = storeToRefs(settingStore)
  const { userName, avatar } = storeToRefs(useUserStore())
  const headerRef = ref()

  const textColor = computed(() => (headerRef.value?.cssVars['--n-text-color'] as string) || '')

  const options: any = [
    {
      label: '用户中心',
      key: '/settings/user-manager',
      icon: () => h(NIcon, null, { default: () => h(Body) })
    },
    {
      label: '退出登录',
      key: '/logout',
      icon: () => h(NIcon, null, { default: () => h(Exit) })
    }
  ]
</script>

<style lang="less" scoped></style>
