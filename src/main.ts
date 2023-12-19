import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/assets/less/index.less'
import gloalComponent from '@/components'
import '@icon-park/vue-next/styles/index.css';

//注册常用的iconpark图标
import iconPark from '@/plugins/IconPark'
const app = createApp(App)
iconPark(app)

//注册svg插件
import 'virtual:svg-icons-register'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(gloalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')
