<script setup lang="ts">
const router = useRouter()
const home = () => {
  router.push('home')
}
const login = () => {
  router.push('login')
}
const text = ref('https://www.antdv.com/')
</script>

<template>
  <div class="home">
    <h1>测试svg图标</h1>
    <svgIcons :width="40" :height="40" color="green" name="logout" />
    <test />
    <hah />
  </div>
  <a-button type="primary" @click="home">Home</a-button>
  <a-button @click="login">Login</a-button>
  <hr />
  <a-space direction="vertical" align="center">
    <a-qrcode :value="text" />
    <a-input v-model:value="text" placeholder="-" :maxlength="60" />
  </a-space>
</template>
<style lang="less" scoped>
.home {
  width: 100vw;
  background-color: #f1f1f1;
}
</style>
