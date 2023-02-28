import { RouteRecordRaw, RouterLink } from 'vue-router'
import { MenuOption } from 'naive-ui'

export function buildRouterTree(routes: RouteRecordRaw[]) {
  if (routes.length === 0) {
    return []
  }

  const routeSet = new Set(routes)
  for (const route of routeSet) {
    const { path } = route
    const pathNames = path.split('/').filter(Boolean)
    // 判断是否含有二级菜单
    if (pathNames.length === 1 && route.component === undefined) {
      route.children = []
      for (const x of routeSet) {
        const childPaths = x.path.split('/').filter(Boolean)
        if (childPaths.length > 1 && childPaths[0] === pathNames[0]) {
          route.children.push(x)
          routeSet.delete(x)
        }
      }
    }
  }
  console.log('routeSet', routeSet)
  return [...routeSet]
}

export function filterRouter<T extends RouteRecordRaw, K extends keyof T>(routerList: T | T[], ignore: string[], matchMode?: K): T[] {
  // 校验是否是Array类型，不是转换成Array类型
  const routes: T[] = Object.prototype.toString.call(routerList) === '[object Array]' ? (routerList as T[]) : [routerList as T]
  if (ignore.length === 0) return routes
  if (routes.length === 0) return []
  return routes.filter(({ [matchMode ?? 'name']: matchValue, meta }) => {
    return !ignore.includes(matchValue as string) && !meta?.hidden
  })
}

function renderIcon(icon?: Component) {
  if (!icon) return
  return () => h(NIcon, null, { default: () => h(icon) })
}

export function generatorMenu<T extends RouteRecordRaw>(routerMap: T[]): MenuOption[] {
  const ignore = ['notFound', 'root', 'login', '403', '404', '500']
  return filterRouter(routerMap, ignore, 'name').map((item) => {
    const { meta, path, component, children = [] } = item
    const currentMenu: MenuOption = {
      label: component ? () => h(RouterLink, { to: { path } }, { default: () => meta?.name || '' }) : meta?.name || '',
      key: path,
      icon: renderIcon(meta?.icon)
    }
    // 是否有子菜单，并递归处理
    if (children.length > 0) {
      // Recursion
      currentMenu.children = []
      currentMenu.children = generatorMenu(children)
    }
    return currentMenu
  })
}
