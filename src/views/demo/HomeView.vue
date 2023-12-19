<script setup lang="ts">
const router = useRouter()
const home = () => {
  router.push('/')
}
const login = () => {
  router.push('/login/')
}
const text = ref('https://www.tanghailong.com/')
</script>

<template>
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
