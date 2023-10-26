<template>
  <div class="login_page">
    <img class="logo" :src="logo"/>
    <div class="title">艺术体操裁判打分客户端</div>
    <input type="number" v-model="form.username" placeholder="Account"/>
    <input type="password" v-model="form.password" placeholder="Password"/>
    <div class="btn_outer btn_outer_submit">
        <div class="btn_inner_submit" @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
    </div>
  </div>
</template>

<script>
// import store from '@/store'時
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
import { Toast } from 'vant'
export default {
  name: 'HomeIndex',
  components: {
  },
  data () {
    return {
      logo: require('@/assets/logo.png'),
      form: {
          grant_type: 'password',
          client_secret: '123456',
          client_id: 'app',
          username: null,
          password: null
      },
    }
  },
  methods: {
    ...mapActions(['Login']),
    login () {
      if (this.form.username == null) {
        Toast('请输入登录账号')
        return
      }
      if (this.form.password == null) {
        Toast('请输入登录密码')
        return
      }
      const { Login } = this
      Toast.loading({
          duration: 0,
          message: '正在登录...',
          forbidClick: false
      })
      Login(this.form).then(res => {
        Toast.clear()
        if (res.status === 0) {
          this.loginSuccess(res)
        } else {
          Toast(res.msg)
        }
      }).catch(() => {
        Toast.clear()
        Toast('登录失败')
      })
    },
    loginSuccess (res) {
      // 如果登录成功
      if (res.status === 0) {
        localStorage.removeItem('loginFaildTimes')
        this.$router.push({
          path: '/match'
        })
      }
    },
    requestFailed () {
      
    },
  }
}
</script>

<style scoped>
.login_page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #343d4c;
}
.logo {
  width: 150px;
  height: 150px;
}
.title {
  font-size: 50px;
  color: white;
  font-weight: bold;
  margin-top: 50px;
}
input {
  border-radius: 10px;
  background: #000000;
  border: 0px;
  width: 60%;
  height: 60px;
  color: white;
  padding: 0px 10px;
  text-align: center;
  font-size: 18px;
}
input[type="text"] {
  margin-top: 110px;
}
input[type="password"] {
  margin-top: 45px;
}
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color:  white;
}
::-webkit-input-placeholder {
    color: #666666;
}
:-moz-placeholder {
    color: #666666;
}
::-moz-placeholder {
    color: #666666;
}
:-ms-input-placeholder {
    color: #666666;
}
.btn_outer {
    width: 27%;
    height: 50px;
    border-radius: 30px;
    padding: 3px;
    margin-top: 80px;
    width: 60%;
}
.btn_outer div {
    height: 100%;
    width: 100%;
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
}
.btn_outer_submit {
    background: linear-gradient(to right, #edb68d ,#ca9b87);
}
</style>
