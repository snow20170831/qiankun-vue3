import { createStore } from 'vuex';

export default createStore({
  state: {
    // hasLogin: false,
    userName: '',
    menus: [
      {
        key: '1',
        name: 'menu1',
        title: '菜单1',
        icon: 'MailOutlined',
      },
      {
        key: '2',
        name: 'menu2',
        title: '菜单2',
        icon: 'MailOutlined',
        children: [
          {
            key: '2.1',
            name: 'menu2.1',
            title: '菜单2-1',
            children: [
              {
                key: '2.1.1',
                name: 'menu2.1.1',
                title: '菜单2-1-1',
              },
            ],
          },
        ],
      },
      {
        key: '3',
        name: 'menu3',
        title: '菜单3',
        icon: 'MailOutlined',
        children: [
          {
            key: '3.1',
            name: 'menu3.1',
            title: '菜单3-1',
          },
        ],
      },
    ],
    menusCopy: [
      {
        icon: 'MailOutlined',
        key: '444be074-851e-4422-857a-316e80eae037',
        label: '线上展厅',
        name: 'exhibitionHall',
        // route: 'exhibitionHall',
        // sequence: 1,
        children: [
          {
            key: '1641866454808',
            label: '内容管理',
            name: 'contentManage',
            children: [
              {
                key: '1641866466120',
                label: '问卷管理',
                name: 'questionnaireManage',
              },
              // {
              //   id: '1641866491174',
              //   label: '楼盘动态',
              //   name: 'propertyDynamic',
              // },
            ],
          },
        ],
      },
    ],
  },
  mutations: {
    // setLoginStatus(state, payload) {
    //   state.hasLogin = payload;
    // },
    changeUserName(state, payload) {
      state.userName = payload;
      localStorage.setItem('userName', payload);
    },
    // setMenus(state, payload) {
    //   state.menus = payload;
    // },
  },
  actions: {
    login({ commit }, userName) {
      console.log('userName', userName);
      // commit('setLoginStatus', true);
      commit('changeUserName', userName);
    },
    loginOut({ commit }) {
      // commit('setLoginStatus', false);
      commit('changeUserName', '');
      localStorage.clear();
    },
  },
  modules: {
  },
});
