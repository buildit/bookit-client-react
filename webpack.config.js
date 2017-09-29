const path = require('path')

const webpack = require('webpack')

const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const HTMLPlugin = require('html-webpack-plugin')

const babelLoaderRule = {
  test: /\.js$/,
  exclude: [ /node_modules/ ],
  loader: 'babel-loader?cacheDirectory',
}

const typescriptLoaderRule = {
  test: /\.tsx?$/,
  exclude: [ /node_modules/ ],
  use: [ 'babel-loader', 'awesome-typescript-loader' ],
}

const lintStylesRule = {
  test: /\.(sass|scss|css)$/,
  enforce: 'pre',
  loader: 'postcss-loader',
  options: { plugins: () => ([ stylelint(), postcssReporter({ clearMessages: true }) ]) },
}

const lintJavascriptRule = {
  test: /\.js$/,
  include: [ path.join(__dirname, 'src') ],
  exclude: [ /node_modules/ ],
  enforce: 'pre',
  use: [ 'eslint-loader' ],
}

const assetsRule = {
  test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$/,
  use: [ { loader: 'url-loader', options: { limit: 20000 } } ],
}

const htmlRule = {
  test: /\.html$/,
  use: [ { loader: 'file-loader?name=[name].[ext]' } ],
}

module.exports = {
  // MAKE IMPORTS GREAT AGAIN!
  resolve: {
    plugins: [
      new TsConfigPathsPlugin,
    ],
    extensions: [ '.ts', '.tsx', '.js', '.json' ],
  },
  entry: {},
  output: {},
  plugins: [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HTMLPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      typescriptLoaderRule,
      babelLoaderRule,
      lintJavascriptRule,
      lintStylesRule,
      assetsRule,
      htmlRule,
    ],
  },
}
