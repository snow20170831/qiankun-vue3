<template>
  <section class="layout-container" :class="'layout-container--' + direction">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'layout-container',
  props: {
    direction: {
      type: String,
      // validator: (value) => /^(horizontal|vertical)$/.test(value),
      default: 'horizontal',
    },
  },
});
</script>

<style lang="less" scoped>
.layout-container {
  flex: 1;
  display: flex;
  box-sizing: border-box;
  overflow: auto;
  &--horizontal {
    flex-direction: row;
  }
  &--vertical {
    flex-direction: column;
  }
}
</style>
