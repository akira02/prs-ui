const path = require('path')
const {DefinePlugin} = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
  entry: ['./src/main.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/static')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: isProduction,
          useTranspileModule: isProduction
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: isProduction
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './assets', to: path.resolve(__dirname, 'dist') },
    ]),
    new DefinePlugin({
      API_BASE: isProduction
        ? JSON.stringify('http://api.prs.ggpark.net/')
        : JSON.stringify('http://localhost:3000/')
    })
  ]
}
