//公共的入口配置
const utils = require("./utils")
module.exports = function (argv, isDev) {
  const mode = argv.mode
  const filename = mode === "production" ? "js/[name].[chunkhash].js" : "js/[name].js"
  const chunkFilename = mode === "production" ? "js/[id].[chunkhash].js" : "js/[id].js"
  return {
    entry: {
      "app": utils.resolve("src/index.js")
    },
    output: {
      path: utils.resolve('dist'),
      publicPath: isDev ? "/" : "./",
      filename,
      chunkFilename,
    },
    resolve: {
      extensions: [".js", ".jsx", ".vue", ".scss", ".json"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'src': utils.resolve('src'),
        'static': utils.resolve('static'),
      },
      modules: [
        utils.resolve("src"),
        utils.resolve("node_modules")
      ]
    }
  }
}
