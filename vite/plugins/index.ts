import vue from '@vitejs/plugin-vue'
import type { Plugin } from "vite";
import autoRegisterAntdV from './antdv'
import autoRegisterElementPlus from './eleplus'

//插件集中管理,安装
export default function setupPlugins(isBuild: boolean, env: ViteEnv) {
    const plugins: Plugin[] = [vue()]
    //注册antdv
    plugins.push(autoRegisterAntdV())
    // 自动注册Element-Plus
    // autoRegisterElementPlus().forEach(element => {
    //     plugins.push(element)
    // });
    return plugins
} 