<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
const store = useHomeStore()
const hello = () => {
  let a = '你好啊'
}
</script>

<template>
  <div>hahah</div>
</template>
<style lang="scss" scoped>
div {
  color: $color;
  background-color: $bgColor;
}
</style>
