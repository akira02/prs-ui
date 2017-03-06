const http = require('http')
const static = require('node-static')
const url = require('url')

const fileServer = new static.Server('.', { cache: 0 })

const server = http.createServer((req, res) => {
    const {pathname} = url.parse(req.url)
    if (pathname.startsWith('/static')) {
        fileServer.serve(req, res)
    } else {
        fileServer.serveFile('/index.html', 200, {}, req, res)
    }
})

server.listen(8080)