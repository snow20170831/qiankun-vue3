<template>
  <footer class="layout-footer">
    <span class="copyright">{{ copyright }}</span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'layout-footer',
  data() {
    return {
      copyright: `深圳思为科技有限公司 版权所有 © 2011-${new Date().getFullYear()}`,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-footer {
  flex: auto 0 0;
  margin: 0 auto;
  text-align: center;
  .copyright {
    // line-height: @--footer-height;
    line-height: 48px;
    font-size: 12px;
    color: #B4B8C0;
  }
}
</style>
