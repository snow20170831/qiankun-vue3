<template>
  <a-menu
    :default-selected-keys="['1']"
    :default-open-keys="['2']"
    mode="vertical"
    theme="dark">
    <template v-for="item in menus" :key="item.key">
      <menu-item v-if="!item.children" :menu-info="item"></menu-item>
      <sub-menu v-else :menu-info="item"></sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItem from './menu-item.vue';
import SubMenu from './sub-menu.vue';

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    SubMenu,
  },
  data() {
    return {
      menus: [
        {
          key: '1',
          title: '菜单1',
          icon: 'MailOutlined',
        },
        {
          key: '2',
          title: '菜单2',
          icon: 'MailOutlined',
          children: [
            {
              key: '2.1',
              title: '菜单2-1',
              children: [
                {
                  key: '2.1.1',
                  title: '菜单2-1-1',
                },
              ],
            },
          ],
        },
        {
          key: '3',
          title: '菜单3',
          icon: 'MailOutlined',
          children: [
            {
              key: '3.1',
              title: '菜单3-1',
            },
          ],
        },
      ],
    };
  },
});
</script>
