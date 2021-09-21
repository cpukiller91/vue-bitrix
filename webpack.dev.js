const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const publicPath = 'http://localhost:8080/'

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  devServer: {
    port: 8080,
    headers: {'Access-Control-Allow-Origin': '*'},
    disableHostCheck: true
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'dist')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', // add prefix
            options: {config: {path: './postcss.config.js'}},
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', // add prefix
            options: {config: {path: './postcss.config.js'}},
          },
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(gif|png|svg|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8064, // Convert images < 8kb to base64 strings
              name: 'img/[hash]-[name].[ext]',
              publicPath: publicPath,
            },
          }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8064, // Convert images < 8kb to base64 strings
              name: 'fonts/[hash]-[name].[ext]',
              publicPath: publicPath,
            },
          }],
      },
    ],
  },
})

