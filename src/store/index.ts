import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useSettingStore from './modules/setting'
import useUserStore from './modules/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia

export { useSettingStore, useUserStore }
