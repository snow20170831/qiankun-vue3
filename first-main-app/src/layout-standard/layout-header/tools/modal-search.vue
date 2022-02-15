<template>
  <div class="modal-search">
    <div class="search__trigger" @click="showDialog">
      <a-icon class="search__icon" type="search" />
      <sw-help class="search__help" content="搜索">
        <a-icon type="search" />
      </sw-help>
      <span class="search__hot-key">{{ isMac ? '⌘ + K' : 'Ctrl + K' }}</span>
    </div>
    <a-modal
      class="tool-modal-search"
      :visible="modalVisible"
      :footer="null"
      :width="520"
      :closable="false"
      :mask-style="{ background: 'rgba(8, 8, 8, 0.04)' }"
      :dialog-style="{ top: '20%' }"
      :body-style="{ padding: 0, background: 'transparent' }"
      @cancel="modalVisible = false"
    >
      <div ref="dialogContentRef">
        <!-- 输入框 -->
        <div class="search-input-wrapper">
          <a-icon type="search" class="search__icon" @click="() => $refs.inputRef.focus()" />
          <a-input ref="inputRef" v-model.trim="keyword" type="text" placeholder="请输入搜索内容" class="search__input" />
          <span v-if="keyword && !searching" class="search__clear" @click="handleClearInput">清除</span>
          <a-icon v-if="searching" type="loading" class="search__loading" />
          <a-icon type="close" class="search__close" @click="handleCloseDialog" />
        </div>
        <!-- 搜索结果 -->
        <div v-show="!waitingInput && !searching" class="search-result-wrapper">
          <div class="search-result" @mousemove="saveMousePosition">
            <!-- 菜单搜索结果 -->
            <div class="search-result__title">导航至({{ menuNavs.length }})</div>
            <div
              v-for="(nav, index) in menuNavs"
              :key="index"
              :class="{ 'search-result__item--active': menuNavIndex === index }"
              class="search-result__item"
              tabindex="-1"
              @mouseenter="handleMouseEnterNav($event, index)"
              @click="navigateToMenu(index)"
            >
              <sw-icon :name="nav[0].icon" />
              <div v-if="nav.length > 1" class="menu-path">
                <template v-for="menu in nav.slice(0, -1)">
                  <span :key="menu.id" class="menu-path-item search-highlight" v-text="menu.name"></span>
                  <a-icon v-if="menu.isForceLeaf" :key="menu.id + 'sep'" style="padding: 4px; color: #B4B8C0" type="right" />
                  <span v-else :key="menu.id + 'sep'" class="menu-path-item__separator">/</span>
                </template>
              </div>
              <span class="sw-ellipsis search-highlight" v-text="nav.slice(-1)[0].name"></span>
            </div>
            <!-- 无搜索结果 -->
            <div v-show="!menuNavs.length" class="no-search-result">没有查询到相关内容，建议换个关键词搜索或按「Esc」退出</div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { isMac } from '@/utils'
import { reactive, watch, nextTick, ref, toRefs } from '@vue/composition-api'
import { useEventListener, useRouter, useStore } from '@/use'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const inputRef = ref(null)
    const dialogContentRef = ref(null)
    const mousePosition = { x: -1, y: -1 }
    const state = reactive({
      modalVisible: false,
      searching: false,
      waitingInput: true,
      keyword: '',
      menuNavIndex: -1,
      menuNavs: [],
    })

    const highlightKeyWord = () => {
      const doms = dialogContentRef.value.querySelectorAll('.search-highlight')
      const display = dialogContentRef.value.style.display
      dialogContentRef.value.style.display = 'none'
      doms.forEach(el => {
        el.innerHTML = el.innerText.replace(
          new RegExp(`(${state.keyword})`, 'g'),
          '<span style="color: #198CFF">$1</span>',
        )
      })
      dialogContentRef.value.style.display = display
    }

    watch(() => state.keyword, function handleSearch (text) {
      if (text) {
        state.searching = true
        state.waitingInput = false
        state.menuNavs = searchMenu(text)
        state.menuNavIndex = state.menuNavs.length ? 0 : -1

        nextTick(highlightKeyWord)

        state.searching = false
      } else {
        state.searching = false
        state.waitingInput = true
        state.menuNavIndex = -1
      }
    })

    useEventListener('keydown', function listenHotKey (event) {
      switch (event.code) {
        case 'KeyK': {
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            showDialog()
          }
          break
        }
        case 'ArrowDown':
          if (state.modalVisible) {
            keyboardNavigate(event.code)
            event.preventDefault()
          }
          break
        case 'ArrowUp':
          if (state.modalVisible) {
            keyboardNavigate(event.code)
            event.preventDefault()
          }
          break
        case 'Enter': {
          if (state.modalVisible && state.menuNavIndex > -1) {
            navigateToMenu(state.menuNavIndex)
          }
          break
        }
      }
    })

    function showDialog () {
      state.modalVisible = true
      nextTick(() => inputRef.value?.focus())
    }
    function handleCloseDialog () {
      state.modalVisible = false
    }
    function handleClearInput () {
      state.keyword = ''
      nextTick(() => inputRef.value?.focus())
    }

    function searchMenu (text) {
      const results = []
      const map = new Map
      const hasChild = menu => menu.children != null && menu.children.length > 0
      const matched = menu => menu.name?.includes(text) && !menu.isGhostMenu // isGhostMenu: @see src/utils/auth.js
      const getAllLeafs = menu => {
        const leafs = []

        menu.isLeafMenu && !menu.isGhostMenu && leafs.push(menu)

        for (const submenu of menu.children || []) {
          map.set(submenu.menuId, submenu)

          if (hasChild(submenu)) {
            leafs.push(...getAllLeafs(submenu))
          }
          submenu.isLeafMenu && !submenu.isGhostMenu && leafs.push(submenu)
        }

        return leafs
      }
      const traverse = (menuTree) => {
        for (const menu of menuTree) {
          map.set(menu.menuId, menu)
          if (matched(menu)) {
            results.push(...getAllLeafs(menu))
            continue
          }
          if (hasChild(menu)) {
            traverse(menu.children)
          }
        }
      }

      traverse(store.state.menuTree)

      const navs = Array.from(new Set(results)).map(leafMenu => {
        const menuPath = [leafMenu]
        let parent = map.get(leafMenu.parentId)
        while (parent) {
          menuPath.push(parent)
          parent = map.get(parent.parentId)
        }
        return menuPath.reverse()
      })

      return navs
    }

    function navigateToMenu (index) {
      handleCloseDialog()

      state.menuNavIndex = index
      const menuPath = state.menuNavs[index]
      const leafMenu = menuPath?.slice(-1)[0]

      if (leafMenu) {
        const route = { name: leafMenu.routerName }
        if (router.resolve(route).resolved.path !== router.currentRoute.path) {
          router.push(route)
        }
      }
    }

    function keyboardNavigate (keyCode) {
      if (keyCode === 'ArrowDown') {
        if (state.menuNavIndex < state.menuNavs.length - 1) {
          state.menuNavIndex++
        }
      }
      if (keyCode === 'ArrowUp') {
        if (state.menuNavIndex > 0) {
          state.menuNavIndex--
        }
      }
      nextTick(() => {
        const activeItemEl = dialogContentRef.value.querySelector('.search-result__item--active')
        activeItemEl.scrollIntoView?.(false)
      })
    }

    function handleMouseEnterNav (event, index) {
      const isMove = mousePosition.x !== event.screenX || mousePosition.y !== event.screenY
      if (isMove) {
        state.menuNavIndex = index
      }
    }

    function saveMousePosition (event) {
      mousePosition.x = event.screenX
      mousePosition.y = event.screenY
    }

    return {
      inputRef,
      dialogContentRef,
      ...toRefs(state),
      isMac,
      // handles
      showDialog,
      handleCloseDialog,
      handleClearInput,
      navigateToMenu,
      handleMouseEnterNav,
      saveMousePosition,
    }
  },
}
</script>

<style lang="less" scoped>
.modal-search {
  .search__trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 178px;
    height: 28px;
    padding: 6px 14px;
    border-radius: 17px;
    color: #5A5C60;
    border: 1px solid #DCDFE6;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
    &:hover {
      color: @--color-primary;
      border-color: currentColor;
      .anticon-search,
      .search__hot-key,
      &::before {
        color: inherit;
      }
    }
  }
  .anticon-search {
    color: #B4B8C0;
  }
  .search__help {
    display: none;
  }
  .search__hot-key {
    order: 2;
    line-height: 1;
    color: #B4B8C0;
  }
}
.search-input-wrapper {
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 8px;
  background: #FFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .search__icon,
  .search__loading,
  .search__clear,
  .search__close {
    line-height: 1;
    flex-shrink: 0;
  }
  .search__input {
    flex-grow: 1;
    padding: 4px 0;
    border: none !important;
    box-shadow: none !important;
  }
  .search__clear {
    display: inline-block;
    white-space: nowrap;
    padding: 18px 15px;
    flex-basis: 54px;
    color: #B4B8C0;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: darken(#B4B8C0, 20%);
    }
  }
  .search__loading {
    padding: 18px 15px;
  }
  .search__icon,
  .search__close {
    padding: 18px 0;
    width: 48px;
    color: #B4B8C0;
    &:hover {
      color: darken(#B4B8C0, 20%);
    }
  }
  .search__close {
    color: #878A90;
    &::before {
      content: "";
      display: inline-block;
      position: relative;
      left: -16px;
      width: 1px;
      height: 16px;
      background: #E7EAF0;
    }
  }
}
.search-result-wrapper {
  background: #FFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  max-height: 444px;
  overflow: auto;
  .search-result {
    &__title {
      padding-bottom: 8px;
      color: #878A90;
      line-height: 20px;
      font-size: 12px;
    }
    &__item {
      display: flex;
      align-items: center;
      height: 48px;
      margin: auto -16px;
      padding: 0 16px;
      cursor: pointer;
      &--active {
        background: #E6F7FF;
      }
      .sw-icon {
        margin-right: 8px;
        flex-shrink: 0;
        color: #B4B8C0;
      }
      .menu-path {
        overflow: hidden;
        display: flex;
        &-item {
          display: inline-block;
          vertical-align: middle;
          min-width: 0;
          color: #5A5C60;
          font-weight: 400;
        }
        &-item:last-of-type {
          white-space: nowrap;
          max-width: 410px;
        }
        &-item:not(:last-of-type) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &-item__separator {
          display: inline-block;
          padding: 0 8px;
          color:  #B4B8C0;
        }
      }
    }
  }
  .no-search-result {
    line-height: 20px;
    font-size: 12px;
    color: #B4B8C0;
  }
}
</style>
<style lang="less">
.tool-modal-search .ant-modal-content {
  background-color: transparent;
  box-shadow: none;
}
@media screen and (max-width: 960px) {
  .modal-search .search__trigger {
    border: none !important;
    display: inline !important;
    padding: 0 !important;
    width: 50px !important;
    .anticon-search {
      color: #5A5C60;
    }
    .search__help {
      display: inline;
    }
    .search__icon {
      display: none;
    }
    .search__hot-key {
      display: none;
    }
  }
}
@media screen and (max-width: 1200px) {
  .modal-search .search__trigger {
    width: 130px !important;
  }
}
</style>
