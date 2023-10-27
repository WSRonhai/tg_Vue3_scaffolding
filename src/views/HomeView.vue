<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
const store = useHomeStore();
</script>

<template>
  <div
    class="flex justify-start flex-col items-center pt-20 box-border w-screen h-screen bg-[#263248] text-white"
  >
    <div class="pb-10 box-border">
      <img src="@/assets/images/logo.png" alt="" class="w-23 h-30" />
    </div>
    <div class="title font-bold md:text-6xl pb-5 text-2xl">
      艺术体操打分终端
    </div>
    <div class="title font-bold md:text-4xl text-xl mb-16 w">连接设置</div>
    <div class="flex justify-center items-center text-xl mb-5 h-12 w-screen">
      <div
        class="flex justify-center items-center bg-gray-600 w-52 mr-5 h-12 rounded"
      >
        服务器IP地址
      </div>
      <div class="rounded w-96">
        <van-field
          v-model="store.ip"
          type="number"
          placeholder="请输入连接IP地址"
          class="h-12 flex justify-center items-center bg-[#1A2437] text-base"
        />
      </div>
    </div>
    <div class="flex justify-center items-center text-xl mb-5 w-screen">
      <div
        class="flex justify-center items-center bg-gray-600 w-52 mr-5 h-12 rounded"
      >
        端口号
      </div>
      <div class="rounded w-96 h-12">
        <van-field
          v-model="store.port"
          type="number"
          class="h-12 flex justify-center items-center bg-[#1A2437] text-base"
          placeholder="请输入连接端口号"
        />
      </div>
    </div>
    <div class="flex justify-center items-start text-xl mb-5 w-screen">
      <div
        class="flex justify-center items-center bg-gray-600 w-52 mr-5 h-12 rounded"
      >
        选择组别
      </div>
      <div class="rounded w-96 grid grid-cols-3 gap-4 content-start">
        <div
          v-for="(item, index) in store.teamList"
          :key="index"
          class="flex justify-center items-center w-30 shrink-0 h-12 bg-[#1A2437] cursor-pointer rounded"
          :class="item.id == store.teamId ? 'bg-[#FFA500]' : ''"
          @click="store.selectTeam(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center w-screen h-20 pt-8">
      <div class="w-52 mr-5 h-20 flex justify-center items-center">
        <van-button
          color="#1A2437"
          size="large"
          :style="{ height: '80px', fontSize: '28px', fontWeight: 'bold' }"
          round
          @click="store.reset"
          >重置</van-button
        >
      </div>
      <div class="w-96 h-20 font-bold flex justify-center items-center">
        <van-button
          color="#FFA500"
          size="large"
          round
          :style="{ height: '80px', fontSize: '28px', fontWeight: 'bold' }"
          @click="store.connect"
          >连接</van-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// .page {
//   width: 100vw;
//   height: 100vh;
//   background-color: #263248;
//   color: white;
// }
</style>
