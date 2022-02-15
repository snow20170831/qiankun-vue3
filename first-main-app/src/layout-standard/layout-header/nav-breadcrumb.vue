<template>
  <nav class="nav-breadcrumb">
    <ul class="sw-flex-center">
      <li
        v-for="(nav, index) in navs"
        :key="index"
        class="nav-breadcrumb-item"
      >
        <div class="nav-breadcrumb-item__title sw-ellipsis">
          <span>{{ nav }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
    navs: Array, // string[]
  },
}
</script>

<style lang="less" scoped>
.nav-breadcrumb {
  display: inline-flex;
  margin-right: 5px;
  &-item {
    &__title {
      line-height: 48px;
      color: #878A90;
      font-size: 14px;
    }
    &__separator {
      margin: auto 2px;
    }
    &:last-child &__title {
      color: #5A5C60;
    }
    &:not(:last-child) &__title::after {
      content: "/";
      display: inline-block;
      padding: 0 8px;
      color:  currentColor;
    }
  }
}
</style>
