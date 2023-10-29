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

## 自动格式化代码

## 规定git commit -m 格式

```bash
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```
