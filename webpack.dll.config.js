const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const vendor = ["vue", "vue-router", "vuex", "vuex-action"]
module.exports = () => {
  return {
    entry: {
      vendor,
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: "[name].dll.js",
      library: "[name]"
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),
      new webpack.DllPlugin({
        path: path.join(__dirname, './dist', '[name].manifest.json'),
        name: "[name]"
      })
    ]
  }
}
