const path = require('path')
const {DefinePlugin, HotModuleReplacementPlugin} = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {CheckerPlugin} = require('awesome-typescript-loader')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/main.tsx'
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['react-hot-loader/webpack', 'awesome-typescript-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'assets', to: './' },
    ]),
    new DefinePlugin({
      API_BASE: JSON.stringify('http://localhost:3000/')
    }),
    new HotModuleReplacementPlugin(),
    new CheckerPlugin()
  ]
}
