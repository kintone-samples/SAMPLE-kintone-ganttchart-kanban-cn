const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { readFileSync } = require('fs')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    disableHostCheck: true,
    https: true,
    hot: true,
    key: readFileSync(resolve(__dirname, '../localhost+2-key.pem')),
    cert: readFileSync(resolve(__dirname, '../localhost+2.pem')),
  },
  plugins: [new HotModuleReplacementPlugin()],
})
