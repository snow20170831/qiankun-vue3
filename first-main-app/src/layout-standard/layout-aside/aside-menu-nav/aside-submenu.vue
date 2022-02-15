<script>
export default {
  name: 'aside-submenu',
  inject: ['parent'],
  props: {
    index: [String, Number], // must be unique
    level: [String, Number],
    indexPaths: { // current menu paths
      type: Array,
      default: _ => [],
    },
  },
  computed: {
    isOpened () {
      return this.parent.openedMenus.includes(this.index)
    },
    isActive () {
      return !this.isOpened
        && this.parent.activeIndexPaths.includes(this.parent.activeIndex) // 404 or ghost menu
        && this.parent.activeIndexPaths.includes(this.index)
    },
  },
  watch: {
    // set position
    async isOpened () {
      const node = this.$refs.popupMenu
      if (this.parent.collapse && this.isOpened && node) {
        await this.$nextTick()
        const parentNode = node.parentNode
        const { height } = node.getBoundingClientRect()
        const { right, top } = parentNode.getBoundingClientRect()
        const maxTop = Math.min(top - 8, window.innerHeight - height) // raech botttom adjust

        node.style.cssText = 'left: ' + (right + 8) + 'px; top: ' + maxTop + 'px'
      }
    },
  },

  methods: {
    handelClick () {
      // 三级菜单 UI 交互与二级菜单不同，保留折叠状态
      if (this.$props.level === 2) {
        const { threeLevelMenus } = this.parent
        const index = threeLevelMenus.indexOf(this.$props.index)
        if (index === -1) {
          threeLevelMenus.push(this.$props.index)
        } else {
          threeLevelMenus.splice(index, 1)
        }
      }
      this.parent.handleSubmenuClick(this.$props)
    },

    handleMouseenter () {
      if (!this.parent.collapse) return
      this.parent.handleSubmenuClick(this.$props)
    },

    handleMouseleave () {},
  },
  render (h) {
    const { collapse } = this.parent
    const { $props, $scopedSlots, isOpened, isActive } = this

    const renderMenuTitle = () => {
      return (
        <div
          class='aside-submenu__title sw-ellipsis'
          onClick={this.handelClick}
          onMouseenter={this.handleMouseenter}
          onMouseleave={this.handleMouseleave}
        >
          {$scopedSlots.title && $scopedSlots.title($props.level)}
          {<a-icon type={'caret-right'} />}
        </div>
      )
    }

    const renderInlineMenu = () => {
      return (
        <ul
          key='inline'
          class={[
            'aside-menu',
            'aside-menu--inline',
            'aside-menu--inline-level-' + ($props.level + 1),
            'sw-hide-scroll-bar',
          ]}
          vShow={isOpened}
        >
          <li vShow={$props.level === 1} style={{ height: '8px' }}></li>
          {$scopedSlots.default && $scopedSlots.default()}
        </ul>
      )
    }

    const renderPopupMenu = () => {
      return (
        <ul
          key='popup'
          ref='popupMenu'
          class={[
            'aside-menu',
            'aside-menu--popup',
            'aside-menu--popup-level-' + ($props.level + 1),
          ]}
          vShow={isOpened}
        >
          {/* show pop menu title */}
          <li
            class='aside-submenu__title aside-submenu__title--popup sw-ellipsis'
            vShow={$props.level === 1}
          >{$scopedSlots.title && $scopedSlots.title()}</li>
          {$scopedSlots.default && $scopedSlots.default()}
        </ul>
      )
    }

    return (
      <li class={[
        'aside-submenu',
        'aside-submenu-level-' + $props.level,
        { 'aside-submenu--active': isActive },
        { 'aside-submenu--opened': isOpened },
      ]}>
        {renderMenuTitle()}
        <keep-alive>
          {collapse ? renderPopupMenu() : renderInlineMenu()}
        </keep-alive>
      </li>
    )
  },
}
</script>

<style lang="less">
.mix-hover {
  background-color: @--aside-menu-bg-color-hover;
  color: @--aside-menu-text-color-hover;
}
.mix-active {
  // border-left-color: @--color-primary;
  background-color: @--aside-menu-bg-color-active;
  color: @--aside-menu-text-color-active !important;
}
.mix-title () {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(@--aside-menu-item-height - 8px);
  margin: 8px 12px;
  padding: 0 12px;
  border-radius: 4px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    .mix-hover();
  }
  .anticon {
    margin-right: -4px;
  }
  .sw-icon {
    margin-left: -1px;
    margin-right: 16px;
  }
}

.aside-submenu {
  user-select: none;
  &:empty {
    display: none;
  }
  &__title {
    .mix-title();
    :nth-last-child(2) {
      flex-grow: 1;
    }
    .anticon[class*="caret"] {
      margin-left: 6px;
      transition: transform 0.2s;
      font-size: 12px;
      // color: #B4B8C0;
    }
  }
  &--opened > &__title {
    .mix-hover();
  }
  &--active &__title {
    .mix-active();
  }
}

// set aside-menu-item
.aside-menu-item {
  padding-right: 14px;
  .mix-title();
  &&--active {
    .mix-active();
  }
}
</style>
