<script setup lang="ts">
import { user } from "@/apis";
import { showDialog } from "vant";
let ip = ref("");
let port = ref("");
let teamId = ref(0) as Ref<number>;
interface teamType {
  id: number;
  name: string;
}
let teamList: Array<teamType> = reactive([
  {
    id: 1,
    name: "1组",
  },
  {
    id: 2,
    name: "2组",
  },
  {
    id: 3,
    name: "3组",
  },
  {
    id: 4,
    name: "4组",
  },
  {
    id: 5,
    name: "5组",
  },
  {
    id: 6,
    name: "6组",
  },
  {
    id: 7,
    name: "7组",
  },
  {
    id: 8,
    name: "8组",
  },
  {
    id: 9,
    name: "9组",
  },
  {
    id: 10,
    name: "10组",
  },
  {
    id: 11,
    name: "11组",
  },
  {
    id: 12,
    name: "12组",
  },
]);
const selectTeam = (item: teamType) => {
  teamId.value = item.id;
};
const connect = () => {
  console.log(teamId, ip, port);
  showDialog({
    title: "标题",
    width: "300px",
    theme: "round-button",
    message: `teamId:${teamId.value}, ip:${ip.value}, port:${port.value}`,
    confirmButtonColor: "#FFA500",
  }).then(() => {
    // on close
  });
};
const reset = () => {
  teamId.value = 0;
  ip.value = "";
  port.value = "";
};
// console.log(data.data.);
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
          v-model="ip"
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
          v-model="port"
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
          v-for="(item, index) in teamList"
          :key="index"
          class="flex justify-center items-center w-30 shrink-0 h-12 bg-[#1A2437] cursor-pointer rounded"
          :class="item.id == teamId ? 'bg-[#FFA500]' : ''"
          @click="selectTeam(item)"
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
          @click="reset"
          >重置</van-button
        >
      </div>
      <div class="w-96 h-20 font-bold flex justify-center items-center">
        <van-button
          color="#FFA500"
          size="large"
          round
          :style="{ height: '80px', fontSize: '28px', fontWeight: 'bold' }"
          @click="connect"
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
