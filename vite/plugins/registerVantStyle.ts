import { ConfigProvider } from 'vant'
import type { App } from 'vue'
//vant样式
// Toast
import 'vant/es/toast/style'
// Dialog
import 'vant/es/dialog/style'
// Notify
import 'vant/es/notify/style'
// ImagePreview
import 'vant/es/image-preview/style'
export default function registerVant(app: App<Element>) {
  app.use(ConfigProvider)
}
