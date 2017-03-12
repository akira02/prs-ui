import fetchMock from 'fetch-mock'
import {API_BASE} from '../src/api'
import {Assignment} from '../src/models/Assignment'

post('tokens', { token: '123123' })

get('assignments', generateAssignments())

function get (path, ...args) {
    return fetchMock.get('begin:' + API_BASE + path, ...args)
}
function post (path, ...args) {
    return fetchMock.post('begin:' + API_BASE + path, ...args)
}

function generateAssignments (): Assignment[] {
    function date (delta): string {
        return new Date(+new Date() + delta).toISOString()
    }
    return [
        {
            id: 'Assignment-ID-1',
            assigned: date(- 24 * 60 * 60 * 1000),
            due: date(+ 24 * 60 * 60 * 1000),
            submitted: null,
            lesson: {
                id: 'Lesson-ID-1',
                name: 'Lesson1'
            }
        }
    ]
}