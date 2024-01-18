<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
interface Route {
  path: string
  breadcrumbName: string
  children?: Array<{
    path: string
    breadcrumbName: string
  }>
}
const routes = ref<Route[]>([
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/settings/',
    breadcrumbName: '权限列表',
  },
  {
    path: 'second',
    breadcrumbName: '增加权限',
  },
])
const router = useRouter()
const collapsed = ref<boolean>(false)

const selectedKeys = ref<string[]>(['1'])
const home = () => {
  router.push({ name: 'HomeView' })
}
const logout = () => {
  console.log(111, 'logout')
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
    >
      <div
        class="logo"
        :style="{ 'justify-content': !collapsed ? 'center' : '' }"
      >
        <img
          class="img"
          src="@/assets/images/logo.jpg"
          alt=""
          style="width: 40px; height: 40px; border-radius: 50%"
        />
        <div v-if="!collapsed" class="title">糖谷管理系统</div>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="0">
          <i class="bx bx-home-alt"></i>
          <span v-if="!collapsed" @click="home">首页</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <i class="bx bx-cog"></i>
              <span v-if="!collapsed">系统设置</span>
            </span>
          </template>
          <a-menu-item key="1">
            <RouterLink :to="{ name: 'MenuList' }">
              <i class="bx bx-menu"></i>
              <span>菜单管理</span>
            </RouterLink>
          </a-menu-item>
          <a-menu-item key="2">
            <i class="bx bx-user"></i>
            <span>角色管理</span>
          </a-menu-item>
          <a-menu-item key="3">
            <i class="bx bxs-user-detail"></i>
            <span>用户管理</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <i class="bx bx-crown"></i>
              <span v-if="!collapsed">权限管理</span>
            </span>
          </template>
          <a-menu-item key="4">权限列表</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="10">
          <RouterLink to="/login/">Login</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-header style="background: #fff; padding: 0 24px">
        <div class="nav">
          <div class="menu" style="font-size: 20px">
            <MenuUnfoldOutlined
              v-if="collapsed"
              fill="#515767"
              @click="() => (collapsed = !collapsed)"
            />
            <MenuFoldOutlined v-else @click="() => (collapsed = !collapsed)" />
            <div>
              <a-breadcrumb
                :routes="routes"
                style="margin: 16px 0; padding-left: 24px"
              >
                <template #itemRender="{ route, paths }">
                  <span v-if="routes.indexOf(route) === routes.length - 1">
                    {{ route.breadcrumbName }}
                  </span>
                  <router-link v-else :to="`/${paths.join('/')}`">
                    {{ route.breadcrumbName }}
                  </router-link>
                </template>
              </a-breadcrumb>
            </div>
          </div>
          <div class="nav-right">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <a-avatar size="large">
                  <template #icon>
                    <avatar theme="outline" size="26" fill="#fff" />
                  </template>
                </a-avatar>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <RouterLink to="/settings/">
                      <i class="bx bx-group"></i>
                      <span style="margin-left: 5px">个人中心</span>
                    </RouterLink>
                  </a-menu-item>

                  <a-menu-divider />
                  <a-menu-item key="3">
                    <i class="bx bx-log-out"></i>
                    <span style="margin-left: 5px" @click="logout">
                      退出登录
                    </span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 24px 0',
          overflow: 'initial',
          overflowX: 'hidden',
        }"
      >
        <RouterView />
      </a-layout-content>
      <a-layout-footer style="text-align: center">糖谷管理系统</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 24px 0;
  box-sizing: border-box;
  .img {
    margin-right: 10px;
  }
  .title {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
}
.nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .nav-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.bx {
  margin-right: 10px;
}
</style>
