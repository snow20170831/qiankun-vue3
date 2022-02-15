import './public-path';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

// createApp(App).use(store).use(router).mount('#app');

type Props = {
  container?: HTMLElement;
}

let app: any = null;

function render(props: Props = {}) {
  const { container } = props;
  app = createApp(App);
  app.use(router);
  app.use(store);
  app.use(Antd);
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
// eslint-disable-next-line
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(): Promise<void> {
  console.log('vue app bootstraped');
}

export async function mount(props: Props): Promise<void> {
  render(props);

  // 注册全局主应用路由 mainRouter
  // const { mainRouter } = props;
  // app.config.globalProperties.$mainRouter = mainRouter;
}

export async function unmount(): Promise<void> {
  app.unmount();
  app = null;
}
