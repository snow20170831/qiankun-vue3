<template>
  <a-menu-item :key="menuInfo.name">
    <router-link :to="{ name: menuInfo.name }">
      <!-- <template v-if="menuInfo.icon" #icon>
        <Icon :type="menuInfo.icon" />
      </template> -->
      <Icon v-if="menuInfo.icon" :type="menuInfo.icon" />
      <span>{{ menuInfo.label }}</span>
    </router-link>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '../../../ICON';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Icon,
  },
});
</script>
