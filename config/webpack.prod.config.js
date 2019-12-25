//生产环境配置
const webpack = require('webpack')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const utils = require("./utils")
const isExistsDir = fs.existsSync(utils.resolve('dist'))
module.exports = function (argv) {
  const mode = argv.mode
  const analyze = argv.analyze
  let analyzerPlugins = []
  let dllReferencePlugin = []
  let addAsset = []
  analyze && analyzerPlugins.push(new BundleAnalyzerPlugin())
  if (isExistsDir) {
    const isExistsFile = fs.existsSync(utils.resolve('dist/vendor.manifest.json'))
    if (isExistsFile) {
      const manifest = utils.resolve('dist/vendor.manifest.json')
      dllReferencePlugin.push(new webpack.DllReferencePlugin({manifest: require(manifest)}))
      addAsset.push(new AddAssetHtmlPlugin({filepath: utils.resolve('dist/vendor.dll.js')}))
    }
  }
  return {
    cache: true,
    optimization: {
      namedChunks: true,
      minimize: true,
      nodeEnv: mode,
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            // chunks: "initial",
            chunks: "all",
          },
        }
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
              beautify: false,
            },
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
            }],
          },
        }),
      ],
    },
    stats: {
      children: false,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'image-webpack-loader',
          enforce: "pre"
        },
      ]
    },
    plugins: [
      ...dllReferencePlugin,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: utils.resolve('index.html'),
        minify: {
          useShortDoctype: true,
          collapseWhitespace: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeAttributeQuotes: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
        },
      }),
      ...addAsset,
      //如果需要插入多个的话，就可以使用数组的当时
      // new AddAssetHtmlPlugin([
      // {filepath: utils.resolve('dist/vendor.dll.js')},
      // {filepath: utils.resolve('dist/vendor.dll.js')}
      // ]),
      new CopyWebpackPlugin([
        {
          from: utils.resolve('static'),
          to: utils.resolve('dist/static'),
          ignore: ['.*']
        }
      ]),
      new MiniCssExtractPlugin({
        filename: mode === "production" ? "css/[name].[contenthash].css" : "css/[name].css",
      }),
      ...analyzerPlugins,
    ]
  }
}
