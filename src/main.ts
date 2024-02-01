import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/assets/less/index.less'
import gloalComponent from '@/components'
//注册svg插件
import 'virtual:svg-icons-register'
//注册boxicons图标库
import '@/assets/css/boxicons.min.css'
import '@/plugins/antdvIcon'
const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(gloalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')
