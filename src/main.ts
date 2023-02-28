import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import naive from 'naive-ui'
import 'virtual:windi.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(naive)
app.mount('#app')
