<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
      <n-space :size="5" align="end">
        <n-icon :component="item.meta?.icon" />
        <n-dropdown v-if="item.children && item.children.length > 0" :options="renderDropdown(item.children)">
          <span class="trigger">
            {{ item.meta?.name }}
          </span>
        </n-dropdown>
        <span v-else @click="() => router.push(item.path)">
          {{ item.meta?.name }}
        </span>
      </n-space>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts" name="MuBreadcrumb">
  import { unique } from '@/utils/common'
  import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
  import { RouteLocationMatched, RouteRecordRaw } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const breadcrumbs = shallowRef<RouteRecordRaw[]>([])

  watchEffect(() => {
    const matched = route.matched
    // 处理 /
    const deal: RouteRecordRaw[] = matched.map((x) => {
      let _route: RouteRecordRaw | RouteLocationMatched = x
      if (x.path === '/') {
        const homeRoute = x.children.find((m) => m.path === x.redirect)
        if (homeRoute) {
          _route = homeRoute
        }
      }
      return {
        path: _route.path,
        meta: _route.meta,
        name: _route.name,
        children: _route.children || []
      } as RouteRecordRaw
    })
    breadcrumbs.value = unique(deal, 'path')
  })

  const renderDropdown = (children: RouteRecordRaw[]): DropdownMixedOption[] => {
    if (!children || children.length === 0) {
      return []
    }
    return children
      .filter((x) => x.meta && !x.meta.hidden) // 过滤掉配置隐藏的菜单
      .map((x) => {
        return {
          label: x.meta?.name || '',
          key: x.path,
          props: {
            onClick: () => router.push({ path: x.path })
          }
        }
      })
  }
</script>

<style scoped></style>
