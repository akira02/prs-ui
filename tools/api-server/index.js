const url = require('url')
const jsonServer = require('json-server')
const {auth, db} = require('./data')

const server = jsonServer.create()
const router = jsonServer.router(db)

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

// handle login request
server.post('/users/login', (req, res) => {
    const {name, password} = req.body
    if (name === auth.username && password === auth.password) {
        res.send({ token: auth.TOKEN })
    } else {
        res.status(403).send({ message: 'bad username or password!' })
    }
})

// handle authorization
server.use((req, res, next) => {
    if (req.headers.authorization === auth.TOKEN) {
        next()
    } else {
        res.status(403).send({ message: 'bad token!' })
    }
})

// convert filter params
server.use((req, res, next) => {
    if (req.query.course_id != null) {
        req.query['course.id'] = req.query.course_id
    }
    next()
})

server.use(router)

module.exports = server