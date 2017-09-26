const path = require('path')

const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',  // TODO - ignore if NOT development
      './src/client.js',
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    hot: true,
    port: 3001,
    historyApiFallback: { verbose: true },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.NamedModulesPlugin,
    // new webpack.HotModuleReplacementPlugin,  // This causes trouble when the npm start script include `--hot`
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HTMLWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: 'only',
              localIdentName: '[name]-[local]--[hash:base64:5]',
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => ([
                require('autoprefixer')(),
              ]),
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 20000 },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]',
          },
        ],
      },
    ],
  },
}
