<script setup lang="ts">
import { RouterView } from 'vue-router'
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
