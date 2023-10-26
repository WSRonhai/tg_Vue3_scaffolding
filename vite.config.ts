import { UserConfig, defineConfig, loadEnv } from 'vite'
import { parseEnv } from "./vite/utils";
import alias from "./vite/alias";
import setupPlugins from "./vite/plugins"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  const isBuild = command == "build";
  const root = process.cwd();
  const env = parseEnv(loadEnv(mode, root))
  console.log('env', env);

  return {

    // plugins: [vue(),],
    plugins: setupPlugins(isBuild, env),
    resolve: {
      // alias: {
      //   '@': fileURLToPath(new URL('./src', import.meta.url))
      // }
      alias,
    },
    server: {
      host: '0.0.0.0',
      port: 5000
    }
  }
})
