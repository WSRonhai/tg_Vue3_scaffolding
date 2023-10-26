<script setup lang="ts">
import { ref } from "vue";
import { user } from "@/apis/";
import { useCounterStore } from "@/stores/counter";
const useUserStore = useCounterStore();
console.log(111, useUserStore.count);

const data = await user.findPrograms();
console.log(data.data);
const value = ref(new Date());
</script>

<template>
  <h1>{{ useUserStore.count }}</h1>
  <div @click="useUserStore.increment">增加couter</div>
  <div>{{ useUserStore.doubleCount }}</div>
  <a-button type="link">Link Button</a-button>
  <a-button type="primary">Primary Button</a-button>

  <h1 class="text-3xl font-bold underline bg-gray-600">Hello world!</h1>
  <!-- <el-button type="primary">Primary</el-button>
  <el-calendar v-model="value" /> -->
</template>
