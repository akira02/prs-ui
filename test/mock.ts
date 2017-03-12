import fetchMock from 'fetch-mock'
import {API_BASE} from '../src/api'
import {Assignment} from '../src/models/Assignment'

function get (path, ...args) {
    return fetchMock.get('begin:' + API_BASE + path, ...args)
}

function post (path, ...args) {
    return fetchMock.post('begin:' + API_BASE + path, ...args)
}

post('tokens', {
    token: '123123'
})

const now: number = +new Date()
const assignments: Assignment[] = [
    {
        id: 'Assignment-ID-1',
        assigned: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
        due: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
        submitted: null,
        lesson: {
            id: 'Lesson-ID-1',
            name: 'Lesson1'
        }
    }
]

get('assignments', assignments)
