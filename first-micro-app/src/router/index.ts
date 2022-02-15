import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue';
// import contentManage from '@/views/contentManage/index.vue';
// import questionnaireManage from '@/views/contentManage/questionnaireManage/index.vue';
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   // component: Home,
  //   redirect: '/about',
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
  //   path: '/',
  //   name: 'Home',
  //   // component: Home,
  //   redirect: '/contentManage',
  // },
  // {
  //   path: '/contentManage',
  //   name: 'contentManage',
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/contentManage/index.vue'),
  // },
];

interface Menu {
  id: string;
  label: string;
  name: string;
  children?: Array<Menu>;
}

export const staticAllMenu: Array<Menu> = [
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
];

staticAllMenu.forEach((menu) => {
  const { name, children = [] } = menu;
  // const { name } = menu;
  // const component = `@/views/${name}/index.vue`;
  const route = {
    path: `/${name}`,
    name,
    component: () => import(`@/standard/views/${name}/index.vue`),
    // component,
  };

  if (children.length) {
    children.forEach((child) => {
      const { name: childName } = child;
      const childPath = `${route.path}/${childName}`;
      // const childComponent = () =>
      // import(`/* webpackChunkName: "${childName}" */ @/views${childPath}/index.vue`);
      const childRoute = {
        path: childPath,
        name: childName,
        component: () => import(`@/standard/views${childPath}/index.vue`),
        // component: childComponent,
      };
      // route.name += childName;
      // route.path += `/${childName}`;
      // const childComponent = `@/views${route.path}`;
      // // console.log('childComponent', childComponent);
      // route.component = () => import(`${childComponent}`);
      routes.push(childRoute);
    });
  } else {
    // const route = {
    //   name,
    //   path: `/${name}`,
    //   component: () => import(`@/views/${name}/index.vue`),
    // };
    routes.push(route);
  }
});

const router = createRouter({
  history: createWebHashHistory(
    // eslint-disable-next-line
    window.__POWERED_BY_QIANKUN__ ? '#/exhibitionHall' : '/dist/',
  ), // hash 模式
  routes,
});

console.log('routes[0]====================', routes);
router.addRoute({
  name: 'home',
  path: '/',
  redirect: routes[0].path,
});

export default router;
