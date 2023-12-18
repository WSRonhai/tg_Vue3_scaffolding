<script setup lang="ts">
import { user, mock } from '@/apis/'
const userinfo = await mock.get()
console.log(111, userinfo)
console.log(111, userinfo.data)
</script>

<template>
  <div class="home">
    <h1>测试svg图标</h1>
    <svgIcons :width="40" :height="40" color="green" name="logout" />
    <test />
    <hah />
  </div>
</template>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
}
</style>
