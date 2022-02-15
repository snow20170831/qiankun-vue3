import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue';
import Login from '@/views/login/index.vue';
import Layout from '@/layout/index.vue';
import NotFound from '@/views/404/index.vue';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/:patchMath(.*)*',
    name: '404',
    component: NotFound,
  },
];

const microAppRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     hidden: true,
  //   },
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue'),
  //   meta: {
  //     title: '首页',
  //     icon: 'DashboardOutlined',
  //   },
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   // redirect: '/login',
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   redirect: '/exhibitionHall',
  // },
  // {
  //   path: '/exhibitionHall',
  //   name: 'exhibitionHall',
  //   component: Layout,
  //   meta: {
  //     isMicro: true,
  //     title: '线上展厅',
  //   },
  //   // redirect: '/exhibitionHall/contentManage/questionnaireManage',
  //   // redirect: { name: 'questionnaireManage' },
  //   children: [
  //     {
  //       path: 'contentManage/questionnaireManage',
  //       name: 'questionnaireManage',
  //       component: () => import(/* webpackChunkName: 'home' */ '@/views/About.vue'),
  //       meta: {
  //         isMicro: true,
  //         title: '问卷管理',
  //       },
  //     },
  //     // {
  //     //   path: 'contentManage/propertyDynamic',
  //     //   name: 'propertyDynamic',
  //     //   component: () => import(/* webpackChunkName: 'home' */ '@/views/About.vue'),
  //     //   meta: {
  //     //     // isMicro: true,
  //     //     title: '楼盘动态',
  //     //   },
  //     // },
  //   ],
  // },
];

// 404
// const commonRoutes: Array<RouteRecordRaw> = [
//   {
//     name: '404',
//     path: '/:patchMath(.*)*',
//     component: () => import(/* webpackChunkName: '404' */ '../views/404/index.vue'),
//   },
// ];

interface Menu {
  id: string;
  label: string;
  name: string;
  icon?: string;
  route?: string;
  sequence?: string | number;
  children?: Array<Menu>;
}

export const staticAllMenu: Array<Menu> = [
  {
    icon: 'MailOutlined',
    id: '444be074-851e-4422-857a-316e80eae037',
    label: '线上展厅',
    name: 'exhibitionHall',
    route: 'exhibitionHall',
    sequence: 1,
    children: [
      {
        id: '1641866454808',
        label: '内容管理',
        name: 'contentManage',
        children: [
          {
            id: '1641866466120',
            label: '问卷管理',
            name: 'questionnaireManage',
          },
          {
            id: '1641866491174',
            label: '楼盘动态',
            name: 'propertyDynamic',
          },
        ],
      },
      {
        id: '1641866481162',
        label: '运营位管理',
        name: 'operationBitManage',
        children: [
          {
            id: '1641866504719',
            label: '首页banner',
            name: 'spreadBanner',
          },
          {
            id: '1641866528086',
            label: '首页弹窗广告',
            name: 'popupAdsManage',
          },
        ],
      },
    ],
  },
];

// const getRoute = (menu: RouteRecordRaw) => {
//   const {
//     path, name, component, label, children = [],
//   } = menu;
//   const route = {
//     path,
//     name,
//     component,
//     meta: {
//       isMicro: true,
//       title: label,
//     },
//     children,
//   };
//   return route;
// };

const setMicroAppRoutes = (menus: Array<Menu>, routes: Array<RouteRecordRaw>, isRoot: boolean) => {
  menus.forEach((menu) => {
    // const { name, label, children = [] } = menu;
    // // const route: RouteRecordRaw = {
    // //   name,
    // //   path: `/${name}`,
    // //   component: Layout,
    // //   meta: {
    // //     isMicro: true,
    // //     title: label,
    // //   },
    // // };
    // const route = getRoute({ ...menu, path: `/${name}`, component: Layout });
    // if (children.length) {
    //   route.children = [];
    //   children.forEach((child) => {
    //     const { name: childName, label: childLabel, children: childChildren = [] } = child;
    //     // const childItem: RouteRecordRaw = {
    //     //   path: childName,
    //     //   name: childName,
    //     //   component: NotFound,
    //     //   meta: {
    //     //     isMicro: true,
    //     //     title: childLabel,
    //     //   },
    //     // };
    //     const childItem = getRoute({ ...child, path: childName, component: NotFound });
    //     if (childChildren.length) {
    //       childItem.children = [];
    //       childChildren.forEach((son) => {
    //         const { name: sonName, label: sonLabel } = son;
    //         // const sonItem: RouteRecordRaw = {
    //         //   path: `${childName}/${sonName}`,
    //         //   name: sonName,
    //         //   component: NotFound,
    //         //   meta: {
    //         //     isMicro: true,
    //         //     title: sonLabel,
    //         //   },
    //         // };
    //         const sonItem = getRoute({
    //           ...son, path: `${childName}/${sonName}`, component: NotFound,
    //         });
    //         if (route.children) {
    //           route.children.push(sonItem);
    //         }
    //       });
    //     } else if (route.children) {
    //       route.children.push(childItem);
    //     }
    //   });
    // }
    // routes.push(route);
    const { name, label, children } = menu;
    const route: RouteRecordRaw = {
      name,
      path: isRoot ? `/${name}` : name,
      component: isRoot ? Layout : NotFound,
      meta: {
        isMicro: true,
        title: label,
      },
    };
    if (children && children.length > 0) {
      route.children = [];
      setMicroAppRoutes(children, route.children, false);
    }
    routes.push(route);
  });
};

setMicroAppRoutes(staticAllMenu, microAppRoutes, true);

export const firstRoute = microAppRoutes[0]?.path || '';

// staticAllMenu.forEach((menu) => {
//   const { name, label, children = [] } = menu;
//   const route: RouteRecordRaw = {
//     name,
//     path: `/${name}`,
//     component: Layout,
//     meta: {
//       isMicro: true,
//       title: label,
//     },
//   };
//   if (children.length) {
//     route.children = [];
//     children.forEach((child) => {
//       const { name: childName, label: childLabel, children: childChildren = [] } = child;
//       const childItem: RouteRecordRaw = {
//         // path: `/${childName}`,
//         path: childName,
//         name: childName,
//         component: NotFound,
//         meta: {
//           isMicro: true,
//           title: childLabel,
//         },
//       };
//       if (childChildren.length) {
//         childItem.children = [];
//         childChildren.forEach((son) => {
//           const { name: sonName, label: sonLabel } = son;
//           const sonItem: RouteRecordRaw = {
//             path: `${childName}/${sonName}`,
//             // path: sonName,
//             name: sonName,
//             component: () => NotFound,
//             meta: {
//               isMicro: true,
//               title: sonLabel,
//             },
//           };
//           if (route.children) {
//             route.children.push(sonItem);
//           }
//           // if (childItem.children) {
//           //   childItem.children.push(sonItem);
//           // }
//         });
//       } else if (route.children) {
//         route.children.push(childItem);
//       }
//     });
//   }
//   microAppRoutes.push(route);
// });

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    ...commonRoutes,
    ...microAppRoutes,
  ],
});

// console.log('routes', microAppRoutes, microAppRoutes[0].path);

// router.addRoute({
//   path: '/',
//   name: 'home',
//   // component: () => import(/* webpackChunkName: '404' */ '../views/404/index.vue'),
//   redirect: microAppRoutes[0].path,
// });

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (localStorage.getItem('userName')) {
    next();
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    // next(`/login?redirect=${to.path}`);
    next('/login');
  }
});

export default router;

// import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import Login from "../views/login/index.vue";
// import Layout from "../layout/index.vue";

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/login",
//     name: "login",
//     component: Login,
//     meta: {
//       hidden: true,
//     },
//   },
//   {
//     path: "/",
//     name: "layout",
//     component: Layout,
//     redirect: "/home",
//     meta: {
//       title: "首页",
//       icon: "DashboardOutlined",
//     },
//     children: [
//       {
//         path: "home",
//         component: () =>
//           import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
//         meta: {
//           title: "首页",
//           icon: "DashboardOutlined",
//         },
//       },
//     ],
//   },
//   {
//     path: "/sub-micro-app",
//     name: "sub-micro-app",
//     component: Layout,
//     meta: {
//       title: "微应用",
//       icon: "SubnodeOutlined",
//     },
//     children: [
//       {
//         path: "table",
//         component: () =>
//           import(/* webpackChunkName: "table" */ "../micro/index.vue"),
//         meta: {
//           title: "表格",
//           icon: "SubnodeOutlined",
//         },
//       },
//       {
//         path: "form",
//         component: () =>
//           import(/* webpackChunkName: "form" */ "../micro/index.vue"),
//         meta: {
//           title: "表单",
//           icon: "SubnodeOutlined",
//         },
//       },
//     ],
//   },
// ];

// const router = createRouter({
//   // history: createWebHistory(process.env.BASE_URL), // history 模式
//   history: createWebHashHistory(), // hash 模式
//   routes,
// });

// export default router;
