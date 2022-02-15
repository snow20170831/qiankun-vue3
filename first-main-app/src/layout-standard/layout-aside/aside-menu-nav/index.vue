<script lang="ts">
import { defineComponent } from 'vue';
import AsideMenu from './aside-menu.vue';
import AsideSubmenu from './aside-submenu.vue';
import AsideMenuItem from './aside-menu-item.vue';
import { findActiveMenus } from '@/utils';

export default defineComponent({
  inject: {
    collapse: {
      value: false,
    },
  },
  render (h) {
    const { menuTree } = this.$store.state
    // leaf menu
    const renderLeafMenu = (menu, level, indexPaths) => {
      indexPaths = [...indexPaths, menu.id]
      const route = { name: menu.routerName }

      return (
        <AsideMenuItem index={menu.id} indexPaths={indexPaths} route={route}>
          {/* only root menu has icon */}
          {level === 1 && <sw-icon size={18} name={menu.icon} />}
          <span class='sw-ellipsis' title={menu.name}>{menu.name}</span>
        </AsideMenuItem>
      )
    }

    // parent menu
    const renderParentMenu = (submenu, level, indexPaths) => {
      indexPaths = [...indexPaths, submenu.id]
      const scopedSlots = {
        title: (level) => [
          level === 1 && <sw-icon size={18} name={submenu.icon} />,
          <span class='sw-ellipsis' title={submenu.name}>{submenu.name}</span>,
        ],
        // eslint-disable-next-line no-use-before-define
        default: () => submenu.children?.map(menu => renderMenu(menu, level, indexPaths)),
      }

      return h(AsideSubmenu, { props: { level, indexPaths, index: submenu.id }, scopedSlots })
    }

    const renderMenu = (menu, level = 0, indexPaths = []) => menu.isLeafMenu
      ? renderLeafMenu(menu, ++level, indexPaths)
      : renderParentMenu(menu, ++level, indexPaths)

    const handleSelectMenu = (index, indexPath) => {
      this.$store.commit('setActiveMenuPath', findActiveMenus(menuTree, indexPath))
    }

    return (
      <nav class='aside-menu-nav sw-hide-scroll-bar'>
        <AsideMenu collapse={this.collapse.value} onSelect={handleSelectMenu}>
          {menuTree.map(menu => renderMenu(menu))}
        </AsideMenu>
      </nav>
    );
  },
});
</script>

<style lang="less">
.aside-menu-nav {
  flex-grow: 1;
  overflow-y: scroll;
  font-family: 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  // 隐藏一级菜单的箭头
 .aside-submenu-level-1.aside-submenu--active .aside-submenu__title {
    font-weight: 500;
  }
  .aside-submenu-level-1:not(.aside-submenu--active):not(.aside-submenu--opened):not(:hover) .sw-icon {
    color: rgba(255, 255, 255, 0.5);
  }
  .aside-submenu-level-1:not(.aside-submenu--opened) > .aside-submenu__title {
    &:not(:hover) > [class*="anticon-caret"] {
      display: none;
    }
  }
  // 第二级菜单 inline
  .aside-menu--inline-level-2 {
    position: absolute;
    top: 0;
    left: 100%;
    bottom: 0;
    // background-color: @--aside-bg-color-dark;
    z-index: 200;
    // width: @--aside-sub-width;
    overflow-y: auto;
    box-shadow: 6px 0 12px rgba(0, 0, 0, 0.06);
    .aside-menu-item,
    .aside-submenu__title {
      padding-left: 12px;
      &:not(:hover) {
        color: rgba(255, 255, 255, 0.85);
      }
      .anticon-caret-right {
        transform: rotate(90deg);
      }
    }
    .aside-submenu--opened > .aside-submenu__title {
      &:not(:hover) {
        background: none;
      }
      .anticon-caret-right {
        transform: rotate(-90deg);
      }
    }
  }
  // 三级菜单 inline
  .aside-menu--inline-level-3 {
    background-color: transparent;//@--aside-bg-color-darker;
    .aside-menu-item {
      padding-left: 28px;
      font-size: 13px;
      &:not(:hover) {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  // popup
  .aside-menu--popup-level-2 {
    position: fixed;
    left: 100%;
    width: 170px;
    border-radius: 4px;
    z-index: 200;
    // background-color: @--aside-bg-color-darker;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.85);
    .aside-menu-item,
    .aside-submenu__title {
      margin-left: 8px;
      margin-right: 8px;
      padding-left: 16px;
      &--popup {
        // height: @--aside-menu-item-height;
        padding-left: 24px;
        margin: 0;
        // border-bottom: 1px solid @--aside-border-color;
        font-weight: 500;
        pointer-events: none;
        border-radius: 0;
      }
    }
  }

  .aside-menu--popup-level-3 {
    position: fixed;
    left: 100%;
    width: 170px;
    border-radius: 4px;
    // background-color: @--aside-bg-color-darker;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
