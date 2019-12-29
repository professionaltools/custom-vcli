//公共的module配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require("./utils")
module.exports = function (isDev) {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          include: utils.resolve('src'),
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.s?css$/,
          exclude: [utils.resolve('src/common/style/index.scss'), /node_modules/],
          use: [
            isDev ? 'vue-style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
            {
              loader: "css-loader",
              options: {
                import: true,
                modules: true,
                sourceMap: isDev,
                importLoaders: 2,
                localIdentName: '[name]__[local]-[hash:base64:5]',
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }, {
          test: /\.s?css$/,
          include: [utils.resolve('src/common/style/index.scss'), /node_modules/],
          use: [
            isDev ? 'vue-style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'vue-style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
            {
              loader: "css-loader",
              options: {
                import: true,
                modules: true,
                sourceMap: isDev,
                importLoaders: 2,
                localIdentName: '[name]__[local]-[hash:base64:5]',
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|svga|apng)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'img/[name].[hash].[ext]',
              }
            },
          ],
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash].[ext]',
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'font/[name].[hash].[ext]'
          },
        },
      ]
    },
  }
}
