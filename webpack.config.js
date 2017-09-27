const path = require('path')

const webpack = require('webpack')

const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

const HTMLPlugin = require('html-webpack-plugin')

const javascriptLoaderRule = {
  enforce: "pre",
  test: /\.js$/,
  loader: 'source-map-loader',
}

const typescriptLoaderRule = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
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
    alias: {
      ActionTypes: path.join(__dirname, 'src/constants/actionTypes'),
      Actions: path.join(__dirname, 'src/actions'),
      Reducers: path.join(__dirname, 'src/reducers'),
      Selectors: path.join(__dirname, 'src/selectors'),
      Sagas: path.join(__dirname, 'src/sagas'),

      Store: path.join(__dirname, 'src/store'),
      History: path.join(__dirname, 'src/history'),
      Routes: path.join(__dirname, 'src/routes'),

      Components: path.join(__dirname, 'src/components'),
      Containers: path.join(__dirname, 'src/containers'),

      Utils: path.join(__dirname, 'src/utils'),

      Styles: path.join(__dirname, 'src/styles'),

      Api: path.join(__dirname, 'src/api'),
      // assets: path.join(__dirname, 'src/assets'),

    },
    extensions: [".ts", ".tsx", ".js", ".json"],
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
      javascriptLoaderRule,
      typescriptLoaderRule,
      lintJavascriptRule,
      lintStylesRule,
      assetsRule,
      htmlRule,
    ],
  },
}
