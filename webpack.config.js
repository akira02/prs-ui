var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './lib/main.js'],
  output: {
    filename: 'bundle.js',
    path: './static'
  }
}
