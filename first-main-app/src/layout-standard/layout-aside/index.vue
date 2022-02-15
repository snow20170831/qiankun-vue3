<template>
  <!-- <aside :class="['layout-aside',{ 'layout-aside--collapse': layoutConf.collapseMenu }]">
    <brand :collapse="layoutConf.collapseMenu" />
    <aside-menu-nav />
    <tool :collapse="layoutConf.collapseMenu" />
    <user :collapse="layoutConf.collapseMenu" />
  </aside> -->
  <aside class="layout-aside">
    <brand />
    <!-- <aside-menu-nav /> -->
    <!-- <tool :collapse="layoutConf.collapseMenu" />
    <user :collapse="layoutConf.collapseMenu" /> -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Brand from './brand.vue';
// import AsideMenuNav from './aside-menu-nav/index.vue';
// import User from './user/index.vue';
// import Tool from './tools/index.vue';
// import { provide, toRef } from '@vue/composition-api'
// import { getLayoutConf, useLayout } from '@/use'

export default defineComponent({
  name: 'layout-aside',
  components: {
    Brand,
    // AsideMenuNav,
    // User,
    // Tool,
  },
  setup(props) {
    // const layoutConf = getLayoutConf();
    // const { toggleCollapseMenu } = useLayout();

    // provide('collapse', toRef(layoutConf, 'collapseMenu'))

    return {
      // layoutConf,
      // toggleCollapse: toggleCollapseMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-aside {
  position: relative;
  flex: auto 0 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  // width: @--aside-width;
  // background-color: @--aside-bg-color;
  transition: width 0.3s;
  // color: @--aside-text-color;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &--collapse {
    // width: @--aside-width--collapse;
    .aside-submenu-level-1 > .aside-submenu__title > [class*="anticon-caret"] {
      visibility: hidden;
    }
  }
}

// 中等屏幕
// @media (max-width: @--screen-md) {
//   .layout-aside {
//     width: @--aside-width--collapse;
//   }
// }
</style>
