const path = require('path')
const WebpackDevServer = require("webpack-dev-server")
const webpack = require('webpack')
const config = require('../webpack.config')

const compiler = webpack(config)

module.exports = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    stats: {
        colors: true,
    }
})
