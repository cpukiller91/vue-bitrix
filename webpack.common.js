const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ChunksFromEntryPlugin = require('./plugins/ChunksFromEntry')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const entries = require('./entries')
const _ = require('lodash')

let plugins = _.reduce(entries, (result, entry, key) => {
  result.push(new HtmlWebpackPlugin({
    inject: false,
    template: 'src/index.php',
    chunks: [],
    entry: key,
    filename: key + '.php',
    alwaysWriteToDisk: true
  }))
  return result
}, [])

module.exports = {
  entry: entries,
  plugins: [
    ...plugins,
    new ChunksFromEntryPlugin(),
    new VueLoaderPlugin(),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'window.$': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      /** Babel for js and react */
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: [['env', {'modules': false, 'targets': {'node': 4}}]]
          },
        },
      },
    ],
  },
}