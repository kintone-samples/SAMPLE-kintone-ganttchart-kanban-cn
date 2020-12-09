const { merge } = require('webpack-merge')
//const { resolve } = require('path')
const common = require('./webpack.common.js')
// const glob = require('glob')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${resolve(__dirname, '../src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
})
