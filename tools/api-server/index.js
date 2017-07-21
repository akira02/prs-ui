const url = require('url')
const _ = require('lodash')
const shortid = require('shortid')
const jsonServer = require('json-server')
const { auth, db, courseStudentMap } = require('./data')

const server = jsonServer.create()
const router = jsonServer.router(db)

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

// handle login request
server.post('/users/login', (req, res) => {
    const { name, password } = req.body
    if (name === auth.username && password === auth.password) {
        res.send({ token: auth.TOKEN })
    } else {
        res.status(403).send({ message: 'bad username or password!' })
    }
})

// handle assignment creation
server.post('/assignments', (req, res) => {
    const course = db.courses.filter(
        course => course.id === req.body.course_id
    )[0]

    if (course == null) {
        res.status('404').send({ success: false })
        return
    }

    const assignment = _.omit(req.body, 'course_id')
    assignment.id = shortid.generate()
    assignment.course = _.pick(course, 'id', 'name')

    db.assignments.push(assignment)
    res.send({ success: true, id: assignment.id })
})

// handle student list of course
server.get('/users', (req, res, next) => {
    if (req.query.course_id == null) {
        next()
        return
    }

    res.send(courseStudentMap.get(req.query.course_id))
})

// handle form creation
server.post('/forms/create', (req, res) => {
    res.send({ success: true, url: 'http://example.com' })
})

// handle authorization
server.use((req, res, next) => {
    if (req.headers.authorization === auth.TOKEN) {
        next()
    } else {
        res.status(403).send({ message: 'bad token!' })
    }
})

// convert id filter
server.use((req, res, next) => {
    if (req.method === 'GET' && req.query.course_id != null) {
        req.query['course.id'] = req.query.course_id
    }
    next()
})

router.render = (req, res) => {
    const keys = ['assignments', 'courses', 'submissions']
    const index = keys.map(key => '/' + key).indexOf(req.path)
    if (req.method == 'GET' && index != -1) {
        res.locals.data = {
            [keys[index]]: res.locals.data
        }
    }
    res.json(res.locals.data)
}

server.use(router)

module.exports = server
