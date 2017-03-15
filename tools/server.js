const http = require('http')
const static = require('node-static')
const url = require('url')
const path = require('path')

const apiServer = require('./api-server') 

fileServer = new static.Server(path.resolve(__dirname, '../dist'), { cache: 0 })

const server = http.createServer((req, res) => {
    const {pathname} = url.parse(req.url)
    if (pathname === '/favicon.ico') {
        res.writeHead(404)
        res.end()
    } else if (pathname.startsWith('/static')) {
        fileServer.serve(req, res).on('error', console.error)
    } else {
        fileServer.serveFile('/index.html', 200, {}, req, res).on('error', err => {
            console.error(err)
            res.writeHead(404)
            res.end()
        })
    }
})

server.on('error', console.error)

server.listen(8080)
apiServer.listen(3000)