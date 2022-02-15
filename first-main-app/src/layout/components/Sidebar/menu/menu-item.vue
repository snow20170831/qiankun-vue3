<template>
  <a-menu-item :key="menuInfo.key">
    <template v-if="menuInfo.icon" #icon>
      <Icon :type="menuInfo.icon" />
    </template>
    {{ menuInfo.title }}
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/ICON';

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
