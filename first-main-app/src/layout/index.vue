<template>
  <a-layout class="layout-wrapper">
    <app-aside />
    <a-layout class="layout-container">
      <app-header />
      <app-main />
      <app-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
// import { registerMicroApps, start } from 'qiankun';
import { start } from 'qiankun';
import AppAside from './app-aside/index.vue';
import AppHeader from './app-header.vue';
import AppMain from './app-main.vue';
import AppFooter from './app-footer.vue';

// @Options({
//   components: {
//     AppAside,
//     AppHeader,
//     AppMain,
//     AppFooter,
//   },
// })
export default defineComponent({
  name: 'layout',
  components: {
    AppAside,
    AppHeader,
    AppMain,
    AppFooter,
  },
  created() {
    start();
  },
});
</script>

<style lang="less" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 100vh;
  // max-height: 100vh;
  overflow: hidden;
  .layout-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
.ant-layout-content {
  flex: 1;
  // display: flex;
  overflow: hidden;
  margin: 16px 16px 0;
  background: #fff;
}
.ant-layout-footer {
  text-align: center;
}
</style>
