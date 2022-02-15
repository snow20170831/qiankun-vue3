<template>
  <div class="layout">
    <layout-aside />
    <layout-container direction="vertical">
      <!-- <layout-header /> -->
      <layout-container
        id="scroll"
        class="page-main layout-main-content-wrapper"
        direction="vertical">
        <!-- <model /> -->
        <main class="layout__main-content">
          <router-view />
        </main>
        <layout-footer />
      </layout-container>
      <!-- <portal-target name="portal-footer" /> -->
    </layout-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutContainer from './layout-container.vue';
import LayoutAside from './layout-aside/index.vue';
// import LayoutHeader from './layout-header/index.vue';
import LayoutFooter from './layout-footer.vue';

export default defineComponent({
  name: 'layout',
  components: {
    LayoutContainer,
    LayoutAside,
    // LayoutHeader,
    LayoutFooter,
  },
});
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  // background-color: @--bg-color-base;
  background-color: #F6F8FA;
  &__main-content {
    margin: 16px 16px 0;
    flex: 1;
  }
}
</style>
