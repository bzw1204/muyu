import { darkTheme, lightTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { ISetting } from './types'

export default defineStore('setting', {
  state: (): ISetting => ({
    collapsed: false,
    collapsedWidth: 48,
    theme: 'light'
  }),
  persist: true,
  getters: {
    getTheme(): BuiltInGlobalTheme {
      return this.theme === 'light' ? lightTheme : darkTheme
    }
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
})
