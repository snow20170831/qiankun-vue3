const webpack = require('webpack');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       // 主题变量： https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
  //       modifyVars: {
  //         'primary-color': '#1890FF',
  //         'table-header-bg': '#F7F8FC',
  //       },
  //     },
  //   },
  // },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //       resolve('./src/styles/variables.less'),
  //       resolve('./src/styles/mixins.less'),
  //       resolve('./src/styles/global.less'),
  //     ],
  //   },
  // },
};