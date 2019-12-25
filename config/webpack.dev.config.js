//开发环境配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const utils = require("./utils")
const devConfig = {
  optimization: {
    minimize: false,
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    open: false,
    host: "0.0.0.0",
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    stats: 'errors-only',
    proxy: {}
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.resolve('index.html'),
      inject: true,
    }),
  ],
}
module.exports = devConfig
