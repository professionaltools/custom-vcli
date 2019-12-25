const merge = require('webpack-merge')
const baseConfig = require('./config/webpack.base.config')
const devConfig = require("./config/webpack.dev.config")
const prodConfig = require("./config/webpack.prod.config")
module.exports = (env, argv) => {
  const isDev = process.env.NODE_ENV === "development"
  return merge(baseConfig(argv, isDev), isDev ? devConfig : prodConfig(argv))
}
