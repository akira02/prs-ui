const url = require('url')
const jsonServer = require('json-server')
const {auth, db} = require('./data')

const server = jsonServer.create()
const router = jsonServer.router(db)

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

server.post('/tokens', (req, res) => {
    const {username, password} = req.body
    if (username === auth.username && password === auth.password) {
        res.send({ token: auth.TOKEN })
    } else {
        res.status(403).send({ message: 'bad username or password!' })
    }
})

server.use((req, res, next) => {
    if (req.headers.authorization === auth.TOKEN) {
        next()
    } else {
        res.status(403).send({ message: 'bad token!' })
    }
})

server.use((req, res, next) => {
    req.query['lesson.id'] = req.query.lesson_id
    console.log(req.query['lesson.id'])
    next()
})

server.use(router)

module.exports = server