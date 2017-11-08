const path = require('path')
const lintConfig = require('../tslint.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../templates/app/index.ts'),
  },
  
  output: {
    filename: '[name].bundle.[ext]',
    path: path.resolve(__dirname, '../templates/target'),
  },
  
  devtool: 'source-map',
  
  target: 'web',
  
  resolve: {
    extensions: [ '.ts', '.js', '.html', '.png', '.css' ],
    modules: [
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  
  module: {
    loaders: [
      {
        test: /\.ts/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: [path.resolve(__dirname, '../templates')],
        exclude: [/node_modules/, path.resolve(__dirname, '../src')],
        options: {
          configuration: lintConfig,
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, '../templates')],
        exclude: [/node_modules/, /\/src\//],
        options: {
          configFile: path.resolve(__dirname, '../templates/app/tsconfig.json'),
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.temp.html$/,
        use: ['file-loader?name=[path][name].[ext]'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.css$/,
        // loader: 'css-loader',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/app/index.html'),
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../templates/temp'),
      to: path.resolve(__dirname, '../templates/target/static'),
      force: true,
      toType: 'dir',
      debug: true,
    }]),
  ],
}

