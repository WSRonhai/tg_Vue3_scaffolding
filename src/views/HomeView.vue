<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
const store = useHomeStore()
const hello = () => {
  let a = '你好啊'
}
</script>

<template>
  <div>hahah</div>
  <!-- <el-button type="primary">Primary</el-button>
  <van-button type="primary">主要按钮</van-button> -->
  <a-button type="primary">Primary Button</a-button>
</template>
<style lang="scss" scoped>
div {
  color: $color;
  background-color: $bgColor;
}
</style>
