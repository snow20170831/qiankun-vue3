const { name } = require('./package.json');
const port = 8082;
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: dev ? '/' : '/first-micro-app/',
  // outputDir: 'dist',
  devServer: {
    // hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}