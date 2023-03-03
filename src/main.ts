import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'virtual:windi.css'
import { install } from '@icon-space/vue-next/es/all'

const app = createApp(App)
install(app, 'i')
app.use(store)
app.use(router)
app.mount('#app')
