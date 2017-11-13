const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const lintConfig = require('../tslint.json')
const promisify = require('util').promisify
const readDir = promisify(fs.readdir)
const isDebug = process.env.DEBUG || false
const manifest = require('../package.json')


module.exports = (async() => {
  const externals = Object.keys(manifest.dependencies).reduce((pre, next) =>
    Object.assign({}, pre, { [next]: `require('${next}')`}), {})
  
  const entries = await readDir(path.join(__dirname, '../src/bin'))
  const entryName = fileName => `bin/${fileName.split('.ts')[0]}`
  const entriesMap = entries.reduce((pre, next) => Object.assign({},
    pre, { [entryName(next)]: path.resolve(__dirname, `../src/bin/${next}`) }), {})
  
  return {
    entry: entriesMap,
  
    externals: externals,
  
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  
    devtool: isDebug ? 'source-map' : '',
  
    target: 'node',
  
    node: {
      __dirname: false,
      __filename: true,
    },
  
    resolve: {
      extensions: [ '.ts', '.js'],
      modules: [
        path.join(__dirname, '../node_modules'),
      ],
    },
  
    module: {
      loaders: [
        {
          test: /\.ts/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'tslint-loader',
          options: {
            configuration: lintConfig,
          },
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, '../tsconfig.json'),
          }
        },
      ],
    },
  
    plugins: [
      new webpack.BannerPlugin({
        raw: true,
        banner: '#!/usr/bin/env node',
      }),
    ],
  }
})()

