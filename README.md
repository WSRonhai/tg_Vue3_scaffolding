# 隆海 Vue3 + Typescript + Vite 脚手架

## axios 封装

## 按需加载 UI 组件

在 Viteplugins 的 index.ts 中选择加载的 UI 组件注册即可，建议选择时只注册 Antdv 或 Element-Plus 中一个

## Tailwindcss

已在全局中注册，可直接使用

## 仓库使用 Pinia

## 本地环境配置

已实现本地配置类型转换和类型提示

```bash
.env.development
VITE_API_URL='http://192.168.xxx.xxx'
VITE_LOAD=true
.env.production
VITE_API_URL='https://xxx.pythl.com/'
VITE_LOAD=true
```

## 自动导入 vue 和 vue-router

已配置自动导包
