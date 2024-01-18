import { UserConfig, defineConfig, loadEnv } from 'vite'
import { parseEnv } from './vite/utils'
import alias from './vite/alias'
import setupPlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  const isBuild = command == 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    esbuild: {
      drop: ['console', 'debugger'], // 删除 所有的console 和 debugger
    },
    // base: '/test/', // 关键代码
    // plugins: [vue(),],
    plugins: setupPlugins(isBuild, env),
    resolve: {
      // alias: {
      //   '@': fileURLToPath(new URL('./src', import.meta.url))
      // }
      alias,
    },
    //引入基础变量
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/less/variable.less";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      open: true,
    },
  }
})
