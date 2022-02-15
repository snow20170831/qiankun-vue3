// import { getParamInLocationSearch } from './'
// import { markRaw } from '@vue/composition-api'
// import axios from 'axios'
// import { openWindow } from './common'

/**
 * 获取 token
 */
// export function getToken () {
//   const { token } = getParamInLocationSearch()
//   if (token) {
//     setToken(token)
//     return token
//   }

//   return localStorage.getItem('token')
// }


/**
 * 设置 token
 * @param {String} token
 */
// export function setToken (token) {
//   localStorage.setItem('token', token)
// }


/**
 * 移除 token
 */
// export function removeToken () {
//   localStorage.removeItem('token')
// }

/**
 * 解析 token
 */
// export function parseToken () {
//   const token = getToken()
//   if (token) {
//     try {
//       const json = atob(atob(token).split('.')[1])
//       return JSON.parse(json)
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return {}
// }

/**
 * 服务器返回树形菜单，权限按钮在对应的菜单 children 字段中
 * component == 0: 默认，根据是否有 child 自动推断是父级菜单还是🍃菜单
 * component == 1: 强制指定菜单为🍃节点【点击后会渲染视图，其下级菜单子路由的形式渲染】
 * component == 2: 使用于标识「编辑/详情」等菜单，搜索菜单时期望过滤此类菜单
 * @typedef {{ id:string, parentId:string, name:string, icon:string, type:number, code:string, routerName:string, sort:number, component:number, children?:Item[] }} Item 菜单或按钮
 * @param {Item[]} itemList
 */
// export function parseMenu (menuTree) {
//   const isMenu = item => item.type === 1
//   const isForceLeafMenu = menu => menu.component === 1 || undefined
//   const isGhostMenu = menu => menu.component === 2 || undefined
//   const traverse = menuList => {
//     for (const item of menuList) {
//       item.menuId = item.id // 接口字段变更，向下兼容
//       item.isGhostMenu = isGhostMenu(item),
//       item.isForceLeaf = isForceLeafMenu(item),
//       item.isLeafMenu = isLeafMenu(item)
//       item.isMenu = isMenu(item)

//       // 权限按钮
//       if (item.isLeafMenu && item.children) {
//         const buttons = []
//         const children = []
//         const isButton = item => item.type === 2

//         for (const child of item.children || []) {
//           isButton(child) && buttons.push(child)
//           isMenu(child) && children.push(child)
//         }
//         item.buttons = buttons
//         item.children = children
//       }

//       markRaw(item)

//       if (item.children?.length) {
//         traverse(item.children)
//       }
//     }
//   }

//   traverse(menuTree)
//   return menuTree
// }

// === compat old menu ===
/**
 * 一维数组菜单，解析成树形菜单
 * component == 0: 默认，根据是否有 child 自动推断是父级菜单还是🍃菜单
 * component == 1: 强制指定菜单为🍃节点【点击后会渲染视图，其下级菜单子路由的形式渲染】
 * component == 2: 用于标识「编辑/详情」等 不直接可见的菜单，搜索菜单时会过滤此类菜单
 * @typedef {{ menuId: string, parentId: string, name: string, icon: string, type: number, code: string, routerName: string, sort: number, component: number, children?:Item[] }} Item 菜单或按钮
 * @param {Item[]} itemList
 */
// export function parseOldMenu (itemList) {
//   const itemMap = new Map()
//   const rootMenu = []

//   const isMenu = item => item.type === 1
//   const isButton = item => item.type === 2
//   const isRootMenu = item => isMenu(item) && item.parentId === 0
//   const isForceLeafMenu = menu => menu.component === 1 || undefined
//   const isGhostMenu = menu => menu.component === 2 || undefined

//   for (const item of itemList) {
//     item.id = item.menuId // 接口字段变更，向下兼容
//     item.isGhostMenu = isGhostMenu(item),
//     item.isForceLeaf = isForceLeafMenu(item),
//     Object.defineProperty(item, 'isLeafMenu', { get () { return isLeafMenu(this) } })
//     item.isMenu = isMenu(item)
//     item.children = []

//     itemMap.set(item.menuId, item)
//     if (isRootMenu(item)) {
//       rootMenu.push(item)
//     }
//   }

//   for (const item of itemMap.values()) {
//     const parentMenu = itemMap.get(item.parentId)
//     if (parentMenu) {
//       isMenu(item) && parentMenu.children.push(item)
//       if (isButton(item)) {
//         if (!parentMenu.buttons) { parentMenu.buttons = [] }
//         parentMenu.buttons.push(item)
//       }
//     }
//   }
//   sortMenu(rootMenu)
//   return rootMenu
// }

/**
 * 给菜单排序
 * @param {Item[]} itemList 菜单数组
 */
// function sortMenu (itemList) {
//   itemList.sort((a, b) => a.sort - b.sort)
//   for (const item of itemList) {
//     if (item.children) {
//       sortMenu(item.children)
//     }
//   }
// }
// === end ===

/**
 * 根据菜单树寻找第一个叶子菜单
 * @param {Array} menuTree
 * @returns  🍃菜单
 */
// export function findFirstLeafMenu (menuTree = []) {
//   return findMenuByExpress(menuTree, isLeafMenu)
// }

/**
 * 根据 route.name 在菜单树中查找匹配的🍃菜单
 * @param {Item[]} menuTree
 * @param {String} routeName
 * @returns {Item|null} 🍃菜单
 */
// export function findMenuByRouteName (menuTree, routeName) {
//   const express = (menu) => menu.routerName === routeName
//   return findMenuByExpress(menuTree, express)
// }

/**
 * 通过菜单 id 查查菜单
 * @param {Item[]} menuTree
 * @param {string[]} menuIds
 * @returns {Array} 激活的菜单数组
 */
export function findActiveMenus (menuTree, menuIds) {
  return menuIds.map(menuId => findMenuByExpress(menuTree, (menu) => menu.id === menuId))
}

/**
 * 根据当前页面的 route.matched ，在菜单树中查找对应的“父级”菜单
 * 主要用在 嵌套路由的页面中 获取父级菜单
 * @param {Item[]} menuTree
 * @param {route[]} routeMatched
 * @returns  含有🍃菜单的父级菜单
 */
// export function findActiveLeafMenuByRouteMatched (menuTree, routeMatched) {
//   /**
//    * 路由的匹配结果是有序的 [父级路由，子级路由]。
//    * 第一个路由对应的就是菜单树中的🍃节点，因为叶子节点才渲染视图
//    * 注意：如果匹配结果为「隐式菜单」，需要追溯到对应🍃父级菜单
//    */
//   const menuMap = new Map
//   const isMenuMatchRoute = (menu, routeMatched) => routeMatched.some(route => route.name === menu.routerName)
//   const express = (menu) => {
//     menuMap.set(menu.id, menu)
//     return isLeafMenu(menu) && isMenuMatchRoute(menu, routeMatched)
//   }
//   let targetMenu = findMenuByExpress(menuTree, express)
//   // 处理「隐式菜单」
//   while (targetMenu?.isGhostMenu) {
//     targetMenu = menuMap.get(targetMenu.parentId)
//   }
//   menuMap.clear()
//   return targetMenu
// }

/**
 * 是否是🍃菜单
 * @param {Item} menu
 * @returns {boolean}
 */
// export function isLeafMenu (menu) {
//   const isButton = item => item.type === 2
//   return !isButton(menu)
//     && (menu.isForceLeaf
//     || menu.children == null
//     || menu.children.length === 0
//     || menu.children.every(isButton))
// }


/**
 * 根据指定条件，在菜单树中查找匹配的菜单
 * @param {Item[]} menuTree
 * @param {(menu: Item) => boolean} express
 */
function findMenuByExpress (menuTree, express) {
  for (const menu of menuTree) {
    if (express(menu)) {
      return menu
    }
    if (menu.children) {
      const submenu = findMenuByExpress(menu.children, express)
      if (submenu) return submenu
    }
  }
}

/**
 * 跳转到帮助中心
 * @param {string} redirectUrl 帮助中心地址
 * @param {string} target 打开的方式
 */
// export function goHelpCenter (redirectUrl, target = '_blank') {
//   const params = {
//     username: 'mack_could',
//     password: 'xEgG4moZciDwIZ51F8LuK3@^',
//   }
//   axios
//     .post('https://help.ideamake.cn/wp-json/jwt-auth/v1/token', params)
//     .then(({ data }) => {
//       const url = 'https://help.ideamake.cn'
//       const query = {
//         'rest_route': '/ideamake-login/v1/autologin',
//         JWT: data.token,
//         redirectUrl,
//       }
//       openWindow({ url, query, target })
//     })
// }
