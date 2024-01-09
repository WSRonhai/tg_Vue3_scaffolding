import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import autoRegisterAntdV from './antdv'
import autoRegisterSvgIcons from './svgIcon'
import autoRegisterMockjs from './mock'

//插件集中管理,安装
export default function setupPlugins(isBuild: boolean, env: ViteEnv) {
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

  //注册antdv
  plugins.push(autoRegisterAntdV())

  //注册iconpark
  // plugins.push(autoRegisterIconPark())
  return plugins
}
