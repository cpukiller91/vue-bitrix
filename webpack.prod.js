const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const publicPath = '/local/webpack/dist/'

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', // add prefix
            options: {config: {path: './postcss.config.js'}},
          }
        ]
      },
      {
        test:  /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true // set to true if you want JS source maps
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
})