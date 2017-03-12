const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
  entry: ['whatwg-fetch', './src/main.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/static')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: isProduction,
          useTranspileModule: isProduction
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './assets', to: path.resolve(__dirname, 'dist') },
    ])
  ]
}
