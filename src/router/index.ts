import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { buildRouterTree } from '@/utils/router-utils'

// 动态生成路由
const pagesMatches = import.meta.glob('../views/**/page.ts', { eager: true, import: 'default' })
const componentMatch = import.meta.glob('../views/**/index.vue')

const routes: RouteRecordRaw[] = []
const dynamicRoutes = Object.entries(pagesMatches).map(([pagePath, config]) => {
  const path = pagePath.replace(/(..\/views|\/components|\/page.ts)/g, '') || '/'
  const name =
    path
      .split('/')
      .filter(Boolean)
      .filter((x) => x !== 'components')
      .join('-') || 'index'
  const componentPath = pagePath.replace('page.ts', 'index.vue')
  return {
    path,
    name,
    meta: config || {},
    component: componentMatch[componentPath]
  } as RouteRecordRaw
})

const x = buildRouterTree(dynamicRoutes)
if (!x.find((x) => x.path === '/')) {
  routes.push({ path: '/', name: 'index', redirect: dynamicRoutes[0].path, component: Layout, children: x })
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
