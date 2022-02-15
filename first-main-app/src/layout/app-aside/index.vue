<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null">
    <brand :collapsed="collapsed" />
    <!-- <a-menu
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
    >
      <template v-for="route in routes">
        <a-sub-menu
          v-if="route.children && route.children.length > 1"
          :key="route.path"
        >
          <template #title>
            <span>
              <Icon :type="route.meta?.icon" />
              <span>{{ route.meta?.title }}</span>
            </span>
          </template>
          <a-menu-item
            v-for="child in route.children"
            :key="getPath(route, child)"
          >
            <router-link :to="getPath(route, child)">
              {{ child.meta?.title }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="getPath(route, (route.children && route.children[0]) || {})"
        >
          <router-link :to="route.path">
            <Icon :type="route.meta?.icon" />
            <span>{{ route.meta?.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu> -->
    <main-menu />
    <a-button @click="toggleCollapsed">
      <Icon v-if="collapsed" type="MenuUnfoldOutlined" />
      <Icon v-else type="MenuFoldOutlined" />
    </a-button>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { RouteRecordRaw } from 'vue-router';
import Brand from './brand.vue';
import MainMenu from './menu/index.vue';
import Icon from '@/ICON';

export default defineComponent({
  name: 'Sidebar',
  components: {
    Brand,
    MainMenu,
    Icon,
  },
  data() {
    return {
      // collapsed: ref<boolean>(false),
      collapsed: false,
      // openKeys: ref<string[]>(['/']),
      // selectedKeys: ref<string[]>(['/home']),
      // routes: ref<RouteRecordRaw[]>([]),
    };
  },
  // watch: {
  //   $route(newVal) {
  //     if (this.selectedKeys[0] !== newVal.path) {
  //       this.initKeys(newVal.path);
  //     }
  //   },
  // },
  // created() {
  //   this.getRoutes();
  //   this.initKeys('');
  // },
  methods: {
    // initKeys(initPath: string) {
    //   const path = initPath || this.$route.path;
    //   const firstIndex = path.indexOf('/');
    //   const lastIndex = path.lastIndexOf('/');
    //   this.openKeys = firstIndex === lastIndex ? ['/'] : [path.substr(0, lastIndex)];
    //   this.selectedKeys = [path];
    // },
    // getRoutes() {
    //   this.routes = this.$router.options.routes.filter((item) => !item.meta?.hidden);
    //   // {
    //   //   // if (item.children) {
    //   //   //   item.children = item.children.filter(e => !e.meta?.hidden)
    //   //   // }
    //   //   return !item.meta?.hidden;
    //   // }
    // },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // getPath(route: { path?: string }, child: { path?: string }) {
    //   if (route.path === '/') {
    //     return `${route.path}${child.path}`;
    //   }
    //   if (!child.path) {
    //     return `${route.path}`;
    //   }
    //   return `${route.path}/${child.path}`;
    // },
  },
});
</script>

<style lang="less" scoped>
.ant-layout-sider {
  // position: fixed;
  // left: 0;
  // height: 100vh;
  // overflow: auto;
  :deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
  }
  .ant-menu-root {
    flex: 1;
  }
  // .brand {
  //   min-height: 56px;
  //   padding: 12px 23px;
  //   .brand--logo,
  //   .brand--whole {
  //     max-width: 100%;
  //     height: 32px;
  //   }
  // }
}
</style>
