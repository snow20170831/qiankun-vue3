import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { registerMicroApps } from 'qiankun';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app');

const isDev = process.env.NODE_ENV === 'development';
console.log('isDev', isDev);
const apps = [
  {
    name: 'FirstMicroApp',
    entry: isDev ? '//localhost:8082' : '/first-micro-app/',
    container: '#microAppContainer',
    activeRule: '#/exhibitionHall',
  },
];
registerMicroApps(apps, {
  beforeLoad: [
    // app => {
    //   console.log("before load", app);
    // }
  ],
  beforeMount: [
    // app => {
    //   console.log("before mount", app);
    // }
  ],
  afterUnmount: [
    // app => {
    //   console.log("after unMount", app);
    // }
  ],
});
