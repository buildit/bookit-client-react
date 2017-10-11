const webpack = require('webpack')

const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

const HTMLPlugin = require('html-webpack-plugin')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')

const sourceLoaderRule = {
  test: /\.tsx?$/,
  exclude: [ /node_modules/ ],
  loader: 'awesome-typescript-loader',
  query: {
    silent: false,
    useBabel: true,
    useCache: true,
    configFileName: 'tsconfig.webpack.json',
  },
}

const sourceLinterRule = {
  test: /\.tsx?$/,
  enforce: 'pre',
  exclude: [ /node_modules/ ],
  loader: 'tslint-loader',
  options: {
    // typeCheck: true,
  },
}

const styleLinterRule = {
  test: /\.(sass|scss|css)$/,
  enforce: 'pre',
  loader: 'postcss-loader',
  options: { plugins: () => ([ stylelint(), postcssReporter({ clearMessages: true }) ]) },
}

const assetsLoaderRule = {
  test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$/,
  use: [ { loader: 'url-loader', options: { limit: 20000 } } ],
}

const htmlLoaderRule = {
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
      sourceLoaderRule,
      sourceLinterRule,
      styleLinterRule,
      assetsLoaderRule,
      htmlLoaderRule,
    ],
  },
}
