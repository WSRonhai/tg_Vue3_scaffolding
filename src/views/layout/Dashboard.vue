<script lang="ts" setup>
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
    path: 'settings',
    breadcrumbName: '权限列表',
  },
  {
    path: 'second',
    breadcrumbName: '增加权限',
  },
])
const collapsed = ref<boolean>(false)

const selectedKeys = ref<string[]>(['1'])
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
          <home
            theme="outline"
            size="15"
            fill="#fff"
            style="margin-right: 10px"
          />
          <span v-if="!collapsed">首页</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <setting-two
                theme="outline"
                size="15"
                fill="#fff"
                style="margin-right: 10px"
              />
              <span v-if="!collapsed">系统设置</span>
            </span>
          </template>
          <a-menu-item key="1">
            <RouterLink :to="{ name: 'MenuList' }">
              <hamburger-button
                theme="outline"
                size="15"
                fill="#fff"
                style="margin-right: 10px"
              />
              <span>菜单管理</span>
            </RouterLink>
          </a-menu-item>
          <a-menu-item key="2">
            <data-user
              theme="outline"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span>角色管理</span>
          </a-menu-item>
          <a-menu-item key="3">
            <every-user
              theme="outline"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span>用户管理</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <permissions
                theme="outline"
                size="15"
                fill="#fff"
                style="margin-right: 10px"
              />
              <span v-if="!collapsed">权限管理</span>
            </span>
          </template>
          <a-menu-item key="4">权限列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="5">
          <template #title>
            <gastrointestinal
              theme="filled"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span v-if="!collapsed">Demo</span>
          </template>
          <a-menu-item key="6">
            <gastrointestinal
              theme="filled"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span><RouterLink to="/validate/">Validate</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="7">
            <gastrointestinal
              theme="filled"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span><RouterLink to="/test/">TestHome</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="8">
            <gastrointestinal
              theme="filled"
              size="15"
              fill="#fff"
              style="margin-right: 10px"
            />
            <span>
              <RouterLink :to="{ name: 'SvgIcon' }">SvgIcon</RouterLink>
            </span>
          </a-menu-item>
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
            <menu-fold-one
              :strokeWidth="3"
              theme="filled"
              size="24"
              fill="#515767"
              v-if="collapsed"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-unfold-one
              :strokeWidth="3"
              v-else
              theme="filled"
              size="24"
              fill="#515767"
              @click="() => (collapsed = !collapsed)"
            />

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
                      <user theme="outline" size="15" fill="#333" />
                      <span style="margin-left: 5px">个人中心</span>
                    </RouterLink>
                  </a-menu-item>

                  <a-menu-divider />
                  <a-menu-item key="3">
                    <power theme="outline" size="15" fill="#333" />
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
</style>
