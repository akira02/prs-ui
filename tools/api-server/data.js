exports.auth = {
    username: 'test',
    password: '123123',
    TOKEN: 'MUCH-TOKEN-WOW'
}

exports.db = {
    lessons: generateLessons(),
    assignments: generateAssignments()
}

function generateLessons () {
    return []
}

function generateAssignments () {
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

function date (delta) {
    return new Date(+new Date() + delta).toISOString()
}