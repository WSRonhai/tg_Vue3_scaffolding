import type { App } from 'vue'
//公共组件自动注册,在common下新建文件夹,文件夹名为组件注册名
const allGlobalComponents = import.meta.glob('./common/*/*.vue')

//插件对象
export default {
  install(app: App) {
    Object.entries(allGlobalComponents).forEach(([file, module]) => {
      const name = file.split('/')[2]
      app.component(name, module)
    })
  },
}
