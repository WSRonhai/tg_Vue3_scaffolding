import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'
import registerVantStyle from '../vite/plugins/registerVantStyle'
import { uiType } from '../vite/config'
import gloalComponent from '@/components'

//注册svg插件
import 'virtual:svg-icons-register'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//注册vnat提示样式
if (uiType == 2) {
  registerVantStyle(app)
}
app.use(gloalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')
