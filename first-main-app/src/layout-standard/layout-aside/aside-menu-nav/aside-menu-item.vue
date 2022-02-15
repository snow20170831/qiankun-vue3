<script>

export default {
  name: 'aside-menu-item',
  inject: ['parent'],
  props: {
    index: [String, Number], // must be unique
    indexPaths: {
      type: Array,
      default: _ => [],
    },
    route: {
      type: Object,
      default: _ => {},
    },
  },
  watch: {
    'parent.activeIndex' (activeIndex) {
      if (activeIndex === this.$props.index) {
        this.handelClick()
      }
    },
  },
  methods: {
    handelClick () {
      this.parent.handleMenuItemClick(this.$props)
    },
  },
  render (h) {
    const { $slots, $props, parent } = this

    return (
      <li
        class={[
          'aside-menu-item sw-ellipsis',
          { 'aside-menu-item--active': parent.activeIndex === $props.index },
        ]}
        onClick={this.handelClick}>
        {$slots.default}
      </li>
    )
  },
}
</script>

<style lang="less">
// see aside-submenu
</style>
