<template>
  <div class="nav-back">
    <a-icon type="arrow-left" />
    <div class="nav-back__separator"></div>
  </div>
</template>

<style lang="less" scoped>
.nav-back {
  position: relative;
  display: inline-block;
  padding: 0 16px;
  margin-left: -16px;
  margin-right: 16px;
  line-height: 48px;
  cursor: pointer;
  &:hover .anticon-arrow-left {
    color: @--color-primary;
  }
  .anticon-arrow-left {
    color: #878A90;
  }
  &__separator {
    position: absolute;
    right: 0;
    top: 14px;
    height: 20px;
    width: 1px;
    background-color: #E7EAF0;
  }
}
</style>
