module.exports = {
  "plugins": {
    "autoprefixer": {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      selectorBlackList: ['ignore'],
      minPixelValue: 3,
      exclude: [/node_modules/],
      landscapeWidth: 750,
    },
  }
}
