<template>
  <!-- <div :class="['brand', { 'brand--collapse': collapse }]">
    <img
      v-if="collapse"
      class="brand--logo"
      :src="groupThemeConfig.newMainLeftLogo || logo"
      :style="groupThemeConfig.newMainLeftLogoStyle"
    />
    <img
      v-else
      class="brand--whole"
      :src="groupThemeConfig.newMainLeftBrand || brand"
      :style="groupThemeConfig.newMainLeftBrandStyle"
    />
  </div> -->
  <div :class="['brand', { 'brand--collapse': collapsed }]">
    <img
      v-if="collapsed"
      class="brand--logo"
      src="../../assets/mini-brand.png"
    />
    <img
      v-else
      class="brand--whole"
      src="../../assets/brand.png"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { mapGetters } from 'vuex'

export default defineComponent({
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      logo: './logo.png',
      brand: './brand.png',
    };
  },
  computed: {
    // ...mapGetters(['groupThemeConfig']),
  },
});
</script>

<style lang="less" scoped>
.brand {
  // min-height: @--header-height;
  min-height: 56px;
  padding: 12px 16px;
  // &--collapse {
  // }
  .brand--logo,
  .brand--whole {
    max-width: 100%;
    height: 32px;
  }
}
</style>
