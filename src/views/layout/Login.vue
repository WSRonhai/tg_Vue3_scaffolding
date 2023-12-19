<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})
const activeKey = ref('1')
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<template>
  <div class="bg">
    <div class="box">
      <a-tabs v-model:activeKey="activeKey" :tabBarGutter="30" size="large">
        <a-tab-pane key="1" tab="用户登录"></a-tab-pane>
        <!-- <a-tab-pane key="2" tab="用户注册"></a-tab-pane> -->
      </a-tabs>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" size="large">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" size="large">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <div style="display: flex; justify-content: flex-end">
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">
                记住密码
              </a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">忘记密码？</a>
          </div>
        </a-form-item>

        <a-form-item>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 0 30px;
            "
          >
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              style="width: 100%"
              class="login-form-button"
            >
              用户登录
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/login.jpg');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    padding: 50px;
    box-sizing: border-box;
    .title {
      font-size: 1.5rem;
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }
}
</style>
