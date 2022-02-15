<template>
  <div class="navbar-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
        {{ item.meta?.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <Icon type="UserSwitchOutlined" />
        {{ userName }}
        <Icon type="DownOutlined" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;" @click="loginOut">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { mapState, mapActions } from 'vuex';
import Icon from '@/ICON';

export default defineComponent({
  components: {
    Icon,
  },
  data() {
    return {
      breadcrumbs: ref<RouteRecordRaw[]>([]),
    };
  },
  computed: {
    ...mapState('user', ['userName']),
  },
  watch: {
    $route() {
      this.getBreadcrumbs();
    },
  },
  created() {
    this.getBreadcrumbs();
  },
  methods: {
    ...mapActions('user', ['LoginOut']),
    getBreadcrumbs() {
      this.breadcrumbs = this.$route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
    },
    loginOut() {
      // console.log("loginout");
      // this.LoginOut().then(() => this.$router.push({ path: '/login' }));
    },
  },
});
</script>

<style lang="less" scoped>
.navbar-wrapper {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  .ant-breadcrumb {
    flex: 1;
    display: flex;
    align-items: center;
    height: 56px;
    // padding: 0 16px;
  }
}
</style>
