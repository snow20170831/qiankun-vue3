<script>
import { findActiveLeafMenuByRouteMatched } from '@/utils'

export default {
  name: 'aside-menu',
  provide () {
    return {
      parent: this,
    }
  },
  props: {
    collapse: Boolean,
  },
  data () {
    return {
      openedMenus: [],
      threeLevelMenus: [],
      activeIndexPaths: [], // active menu paths
      activeIndex: '', // unique index
    }
  },
  watch: {
    $route (route) {
      if (route == null) return
      const { menuTree } = this.$store.state
      const menu = findActiveLeafMenuByRouteMatched(menuTree, route.matched)
      this.activeIndex = menu && menu.id
    },
  },

  mounted () {
    const removeClickAway = this.attatchClickAway()
    this.$on('hook:beforeDestroy', removeClickAway)
  },

  methods: {
    // collapse the menu
    attatchClickAway () {
      const aside = document.querySelector('.layout-aside > .aside-menu-nav')
      const listener = (event) => {
        if (!aside.contains(event.target)) {
          if (this.openedMenus.some(index => !this.threeLevelMenus.includes(index))) { // reduce submenu render behavior
            this.openedMenus = this.threeLevelMenus.slice()
          }
        }
      }
      document.addEventListener('click', listener)

      return () => {
        document.removeEventListener('click', listener)
      }
    },

    handleSubmenuClick (propsItem) {
      const { index, indexPaths } = propsItem
      const openIndex = this.openedMenus.indexOf(index)

      if (openIndex !== -1) { // close the sumbmenu
        this.openedMenus.splice(openIndex, 1)
      } else { // open the submenu
        const preserved = this.$props.collapse ? indexPaths : indexPaths.concat(this.threeLevelMenus) // only for three level inline menu
        this.openedMenus = this.openedMenus.filter(index => preserved.includes(index))
        this.openedMenus.push(index) // close other menu
      }
    },

    handleMenuItemClick (propsItem) {
      const { index, indexPaths } = propsItem
      // save active paths
      this.activeIndexPaths = indexPaths

      const old = this.activeIndex
      this.activeIndex = index

      // Avoided redundant navigation to current location
      if (old !== index) {
        let { route } = propsItem
        const { resolved } = this.$router.resolve(route)
        // none matched
        if (resolved.matched.length === 0) {
          route = { path: '/404' }
        }
        this.$router.push(route, _ => { }, (error) => {
          this.activeIndex = old // recovery prev active item
        })
      }
      // collapse all menus, but three level
      this.openedMenus = this.threeLevelMenus.slice()

      this.$emit('select', index, indexPaths)
    },
  },

  render (h) {
    const { $slots, $props } = this
    return (
      <ul class={['aside-menu', { 'aside-menu--collapse': $props.collapse }]}>
        {$slots.default}
      </ul>
    )
  },
}
</script>

<style lang="less">
.aside-menu {
  &--skeleton {
    background-image: linear-gradient(0deg, transparent 0, transparent 4px,
    @--aside-menu-bg-color-hover 4px, @--aside-menu-bg-color-hover calc(@--aside-menu-item-height + 4px),
    transparent calc(@--aside-menu-item-height + 4px), transparent calc(@--aside-menu-item-height + 8px));
    background-repeat: repeat-y;
    background-size: calc(@--aside-width - 24px) calc(@--aside-menu-item-height - 8px);
    background-position: 12px 0;
  }
  &--collapse {
  }
}
</style>
