import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import autoRegisterAntdV from './antdv'
import autoRegisterElementPlus from './eleplus'
import autoRegisterVant from './vant'
import autoRegisterSvgIcons from './svgIcon'
import { uiType } from '../config' //选择ui库
import autoRegisterMockjs from './mock'

//插件集中管理,安装
export default function setupPlugins(isBuild: boolean, env: ViteEnv) {
  console.log('uiType', isBuild)

  const plugins: Plugin[] = [vue()]
  // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
  plugins.push(
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      // 生成自动导入的TS声明文件
      dts: '../../auto-import.d.ts',
    }),
  )
  //注册icons
  plugins.push(autoRegisterSvgIcons())

  //注册 mock.js
  if (!isBuild) {
    plugins.push(autoRegisterMockjs())
  }
  //1.注册antdv  2.注册element-plus 3.注册vant组件
  if (uiType == 0) {
    plugins.push(autoRegisterAntdV())
  } else if (uiType == 1) {
    autoRegisterElementPlus().forEach((element) => {
      plugins.push(element)
    })
  } else if (uiType == 2) {
    plugins.push(autoRegisterVant())
  }
  return plugins
}
