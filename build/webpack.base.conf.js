//最基础的打包配置，是开发环境和生产环境都要用到的配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 需要配置 resolve.alias 别名，不然 Webpack 没法找到 Vue 模块
const AutoDllPlugin = require('autodll-webpack-plugin'); // 第三方库提取出来单独打包，这样有利于减少打包时间
// 抽取 CSS 到单文件 打包之后，你会发现所有的 CSS 代码都被抽取到了一个单独的 CSS 文件当中。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  // 打包入口
  entry: {
    bundle: path.resolve(__dirname, '../src/index.js')
  },
  // 打包出口
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js' // 打包的文件名 hash名字
  },
  // 使用loader webpack 打包可执行的语言
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // file-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  // 用来识别 vue 文件的标示
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 方便我们引入依赖或者文件的时候可以省略后缀
      '@': path.resolve(__dirname, '../src'), // 使用 @ 来代替 src，省去了写文件路径的麻烦。
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new VueLoaderPlugin(),
    // 每次打包，这个插件都会检查注册在 entry 中的第三方库是否发生了变化，如果没有变化，插件就会使用缓存中的打包文件，减少了打包的时间，这时 Hash 也不会变化
    new AutoDllPlugin({
      inject: true, // 插件会自动把打包出来的第三方库文件插入到 HTML
      debug: true,
      filename: '[name]_[hash].js', // 打包文件名
      path: './dll', // 打包路径
      entry: {
        vendor: ['vue', 'vue-router', 'vuex'] //入口
      }
    }),
    new webpack.optimize.SplitChunksPlugin(), // 默认的提取配置来提取你的公共代码，如果你不想使用默认配置，请给插件构造函数传入配置对象.
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};