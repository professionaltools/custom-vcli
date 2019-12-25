//公共plugins配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require("./utils")
module.exports = function () {
  return {
    plugins: [
      new VueLoaderPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([
        {
          from: utils.resolve('static'),
          to: utils.resolve('dist/static'),
          ignore: ['.*']
        }
      ])
    ]
  }
}
