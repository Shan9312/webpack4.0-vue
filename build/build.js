//  生产环境要使用的配置
// 通过 Node 接口进行打包的脚本

const webpack = require('webpack');
const config = require('./webpack.base.conf');

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 处理错误日志
    console.error(err);
    return;
  }
  // 处理完成日志
  console.log(stats.toString({
    chunks: false, // 使构建过程更静默无输出
    colors: true // 在控制台展示颜色
  }));
})