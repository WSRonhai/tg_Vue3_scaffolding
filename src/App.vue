<script setup lang="ts">
import { RouterView } from "vue-router";
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
</script>

<template>
  <Suspense>
    <!-- <van-config-provider theme="dark"> -->
    <RouterView />
    <!-- </van-config-provider> -->
  </Suspense>
</template>

<style lang="scss" scoped>
// body {
//   padding: 0;
//   margin: 0;
//   height: 100%;
// }
</style>
