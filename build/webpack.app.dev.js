const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.app')

module.exports = webpackMerge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  
  output: {
    path: path.resolve(__dirname, '../templates/target'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  devServer: {
    historyApiFallback: true,
    contentBase: './templates',
    stats: 'minimal',
  }
})
