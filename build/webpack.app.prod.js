const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.app')

module.exports = webpackMerge(baseConfig, {
  
  output: {
    path: path.resolve(__dirname, '../templates/target'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    
    new webpack.optimize.UglifyJsPlugin({
      mangle: { keep_fnames: true },
      sourceMap: false,
    }),
    
    new ExtractTextPlugin('[name].[hash].css'),
    
    new webpack.LoaderOptionsPlugin({
      htmlLoader: { minimize: true },
    }),
  ],
})
