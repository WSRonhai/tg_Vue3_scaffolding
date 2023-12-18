<script setup lang="ts"></script>

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
