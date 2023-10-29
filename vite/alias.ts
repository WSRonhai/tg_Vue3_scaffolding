// import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import type { AliasOptions } from 'vite'

//定义目录别名
const alias = {
  // "@": fileURLToPath(new URL('../src', import.meta.url))
  '@': path.resolve(__dirname, '../src'),
} as AliasOptions
export default alias
