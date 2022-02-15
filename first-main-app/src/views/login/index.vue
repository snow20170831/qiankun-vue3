<template>
  <div class="login-view">
    <img class="login-view-logo" src="./image/logo.png" />
    <div class="login-view-container">
      <img class="bg-inset" src="./image/inset.png" />
      <div class="login-wrapper">
        <h1 class="login-title">思为营销云管理平台</h1>
        <div class="login-panel">
          <!-- <a-tabs>
            <a-tab-panel></a-tab-panel>
            <a-tab-panel></a-tab-panel>
          </a-tabs> -->
          <login-password ref="loginPassword"></login-password>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPassword from './components/LoginPassword.vue';

export default defineComponent({
  name: 'login',
  components: {
    LoginPassword,
  },
});
</script>

<style lang="less" scoped>
.login-view {
  position: relative;
  background: #f1f3f6;
  width: 100%;
  height: 100vh;
  overflow: auto;
  &-logo {
    position: absolute;
    top: 27px;
    left: 64px;
    width: auto;
    height: 32px;
  }
  &-container {
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-inset {
    margin-right: 130px;
    height: 330px;
    width: 598px;
  }
  .login-wrapper {
    flex-shrink: 0;
    width: 421px;
    height: 369px;
    padding: 36px 50px 40px;
    background: #fff;
    box-shadow: 0px 6px 20px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    .login-title {
      margin: 0 auto 20px;
      line-height: 37px;
      font-size: 26px;
      font-family: 'PingFang SC';
      font-weight: 500;
      color: #000;
      text-align: center;
    }
  }
}
</style>
