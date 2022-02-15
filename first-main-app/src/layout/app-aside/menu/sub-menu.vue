<template>
  <a-sub-menu :key="menuInfo.name">
    <template v-if="menuInfo.icon" #icon>
      <ICON :type="menuInfo.icon" />
    </template>
    <template #title>{{ menuInfo.label }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <!-- <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <ICON :type="item.icon" />
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key"></sub-menu>
      </template> -->
      <menu-item v-if="!item.children" :menu-info="item"></menu-item>
      <!-- <a-menu-item v-if="!item.children" :key="item.name">{{ item.label }}</a-menu-item> -->
      <sub-menu v-else :menu-info="item"></sub-menu>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItem from './menu-item.vue';
import ICON from '../../../ICON';

export default defineComponent({
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MenuItem,
    ICON,
  },
});
</script>
