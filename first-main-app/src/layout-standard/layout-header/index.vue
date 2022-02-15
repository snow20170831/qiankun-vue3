<template>
  <header class="layout-header">
    <div v-show="layoutConf.header" class="layout-header__inner">
      <div class="layout-header__title">
        <nav-back v-if="hasNavBack" @click.native="handleBack" />
        <nav-breadcrumb :navs="navs" />
      </div>
      <nav class="header-custom-menu">
        <modal-search />
        <span class="header-custom-menu__separator"></span>
        <custom-menu-item
          v-if="needCheck"
          :disabled="hasChecked"
          icon="check"
          :title="hasChecked ? '功能已验收' : '功能验收'"
          @click="!hasChecked && openModalAcceptance()"
        />
        <custom-menu-item icon="question-circle" title="帮助中心" @click="goHelpCenter" />
      </nav>
    </div>
    <portal-target name="portal-header" />

    <!-- modals -->
    <modal-acceptance v-if="needCheck" :visible.sync="acceptanceVisible" @success="hasChecked = true" />
  </header>
</template>

<script>
import ModalSearch from './tools/modal-search.vue'
import ModalAcceptance from './tools/modal-acceptance.vue'
import { mapState } from 'vuex'
import NavBreadcrumb from './nav-breadcrumb.vue'
import NavBack from './nav-back.vue'
import { unref } from '@vue/composition-api'
import { getNavBackStack } from '@/use'
import { goHelpCenter } from '@/utils'

const CustomMenuItem = ({ props, listeners }) => {
  return (
    <div class={['header-custom-menu-item', { disabled: props.disabled }]} {...{ on: listeners }}>
      <a-icon class='custom-menu-item__icon' type={props.icon} />
      <sw-help class='custom-menu-item__help' content={props.title}>
        <a-icon type={props.icon} />
      </sw-help>
      <span class='custom-menu-item__title'>{props.title}</span>
    </div>
  )
}
export default {
  name: 'layout-header',
  components: {
    CustomMenuItem,
    ModalAcceptance,
    ModalSearch,
    NavBreadcrumb,
    NavBack,
  },
  inject: ['layoutConf'],
  data () {
    return {
      needCheck: false,
      hasChecked: false,
      acceptanceVisible: false,
      navBackStack: getNavBackStack(),
    }
  },
  computed: {
    hasNavBack () {
      return this.navBackStack.length > 0
    },
    navs () {
      const menuNavs = this.activeMenuPath.map(menu => menu.name)
      const customNavs = this.navBackStack.reduce((navs, stack) => navs.concat(unref(stack[0])), [])
      return menuNavs.concat(customNavs)
    },
    ...mapState(['hasLogin', 'user', 'activeMenuPath']),
  },
  mounted () {
    setTimeout(() => {
      this.hasLogin && this.getACCheck()
    }, 5000)
  },
  methods: {
    handleBack () {
      const onNavBack = this.navBackStack.slice(-1)[0][1]
      onNavBack?.()
    },
    getACCheck () {
      this.$Api.ACCheck().then(res => {
        // 旧逻辑无备注，这是什么意思？？
        if (res.data > -1) {
          this.acceptanceVisible = res.data === 0
          this.needCheck = true
          this.hasChecked = res.data
        }
      })
    },
    // TODO
    goHelpCenter,
    openModalAcceptance () {
      this.acceptanceVisible = true
    },
  },
}
</script>
<style lang="less">
.layout-header {
  flex: auto 0 0;
  position: relative;
  background-color: #fff;
  // box-shadow: 3px 5px 4px 0px #f0f0f0;
  z-index: 50;
  &__inner {
    padding: 0 16px;
    display: flex;
    min-height: @--header-height;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E7EAF0;
    .header-custom-menu {
      display: flex;
      align-items: center;
      &-item {
        margin-left: 18px;
        line-height: @--header-height;
        cursor: pointer;
        color: #5A5C60;
        white-space: nowrap;
        transition: color 0.2s;
        .anticon {
          margin-right: 8px;
          color: #B4B8C0;
        }
        .custom-menu-item__help {
          display: none;
        }
        &:hover {
          color: @--color-primary;
          .anticon {
            color: inherit;
          }
        }
        &.disabled {
          cursor: default;
          color: #bbb;
        }
      }
      &__separator {
        display: inline-block;
        width: 1px;
        height: 18px;
        margin-left: 18px;
        background-color: #E7EAF0;
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .layout-header__inner .header-custom-menu-item {
    .anticon {
      color: #5A5C60;
    }
    .custom-menu-item__icon {
      display: none;
    }
    .custom-menu-item__help {
      display: inline;
    }
    .custom-menu-item__title {
      display: none;
    }
  }
}
</style>
