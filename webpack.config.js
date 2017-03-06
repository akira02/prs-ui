var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './src/main.tsx'],
  output: {
    filename: 'bundle.js',
    path: './static'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
}
