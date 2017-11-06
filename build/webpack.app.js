const path = require('path')
const lintConfig = require('../tslint.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, '../templates/app/index.ts'),
  },
  
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../templates/target'),
  },
  
  devtool: 'source-map',
  
  target: 'web',
  
  resolve: {
    extensions: [ '.ts', '.js', '.html', '.png' ],
    modules: [
      path.join(__dirname, '/node_modules'),
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
  ],
}

