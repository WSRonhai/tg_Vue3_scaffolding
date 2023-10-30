<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    default: 'phone',
  },
  color: {
    type: String,
    default: 'red',
  },
  width: {
    type: Number,
    default: 30,
  },
  height: {
    type: Number,
    default: 30,
  },
})
</script>
<template>
  <svg :style="{ width: width + 'px', height: height + 'px' }">
    <!-- xlink:href:#icon-<name> 执行图标 fill:填充颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss"></style>
