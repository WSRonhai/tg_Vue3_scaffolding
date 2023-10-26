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
    <RouterView />
  </Suspense>
</template>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.page {
  min-height: 100vh;
  background: #f7f6f6;
}
</style>
