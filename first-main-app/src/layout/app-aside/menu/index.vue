<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="vertical"
    theme="dark">
    <template v-for="item in staticAllMenu" :key="item.name">
      <menu-item v-if="!item.children" :menu-info="item"></menu-item>
      <sub-menu v-else :menu-info="item"></sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
// v-model:selectedKeys="selectedKeys"    v-model:openKeys="openKeys"
import { defineComponent, ref } from 'vue';
import MenuItem from './menu-item.vue';
import SubMenu from './sub-menu.vue';
import { staticAllMenu } from '@/router';

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    SubMenu,
  },
  data() {
    return {
      staticAllMenu,
      openKeys: ref<Array<string | symbol>>(['']),
      selectedKeys: ref<Array<string | symbol>>(['']),
    };
  },
  // com
  watch: {
    $route(newVal) {
      // console.log('watch', this.selectedKeys[0], newVal, newVal.name);
      if (this.selectedKeys[0] !== newVal.name) {
        this.initKeys(newVal.name);
      }
    },
  },
  created() {
    // console.log('created', this.staticAllMenu);
    this.initKeys('');
  },
  methods: {
    // initKeys(initName: string) {
    //   let name = initName;
    //   if (!initName) {
    //     if (this.staticAllMenu.length > 0) {
    //       [{ name }] = this.staticAllMenu;
    //     }
    //   }
    //   console.log('initKeys', name);
    //   this.openKeys = [name];
    //   this.selectedKeys = [name];
    // },
    initKeys(initName: string | symbol) {
      const name = initName || this.$route.name || '';
      // if (!initName) {
      //   if (this.staticAllMenu.length > 0) {
      //     [{ name }] = this.staticAllMenu;
      //   }
      // }
      this.openKeys = [name];
      this.selectedKeys = [name];
    },
  },
});
</script>
