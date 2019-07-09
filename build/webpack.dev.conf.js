// 开发环境要使用的配置
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
// 在文件头部引入 webpack 依赖
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true // 热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() //热更新的插件
  ]
});