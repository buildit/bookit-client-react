const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')

const dev = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/client.jsx',
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    hot: true,
    port: 3001,
    compress: true,
    historyApiFallback: { verbose: true },
    noInfo: false,
    stats: { colors: true },
    overlay: { errors: true, warnings: false },
  },
  plugins: [
    new webpack.NamedModulesPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true, modules: true, camelCase: 'only', localIdentName: '[name]-[local]--[hash:base64:5]', importLoaders: 2 } },
          { loader: 'postcss-loader', options: { sourceMap: true, plugins: () => ([ autoprefixer() ]) } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
}

module.exports = merge.smart(webpackConfig, dev)
