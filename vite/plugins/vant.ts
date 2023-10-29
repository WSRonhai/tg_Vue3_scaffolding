import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default function autoRegisterVant() {
  return Components({
    resolvers: [VantResolver()],
  })
}
