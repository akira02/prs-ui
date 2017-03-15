exports.auth = {
    username: 'test',
    password: '123123',
    TOKEN: 'MUCH-TOKEN-WOW'
}

const courses = generateCourses()
const assignments = generateAssignments(courses)

exports.db = { courses, assignments }

function generateCourses () {
    const result = []
    for (let i = 0; i < 10; ++i) {
        const teacher = randomInt(5)
        result.push({
            id: `Course-ID-${i}`,
            name: `Course${i}`,
            semester: '105-2',
            teacher: {
                id: `Teacher-ID-${teacher}`,
                name: `Teacher${teacher}`
            }
        })
    }
    return result
}

function generateAssignments (courses) {
    const ONE_MONTH = 30 * 24 * 60 * 60 * 1000
    const result = []
    for (let i = 0; i < 100; ++i) {
        const course = courses[randomInt(courses.length)]
        result.push({
            id: `Assignment-ID-${i}`,
            assigned: date(- randomInt(ONE_MONTH)),
            due: date(+ randomInt(ONE_MONTH)),
            submitted: null,
            course: {
                id: course.id,
                name: course.name
            }
        })
    }
    return result
}

function randomInt (upper) {
    return Math.floor(Math.random() * upper)
}

function date (delta) {
    return new Date(+new Date() + delta).toISOString()
}