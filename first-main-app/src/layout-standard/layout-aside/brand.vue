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
  <div class="brand">
    <img
      class="brand--logo"
      :src="logo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { mapGetters } from 'vuex'

export default defineComponent({
  props: {
    collapse: Boolean,
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
  padding: 12px 16px;
  &--collapse {
  }
  .brand--logo {
    max-width: 100%;
    height: 32px;
  }
  .brand--whole {
    max-width: 100%;
    height: 32px;
  }
}
</style>
