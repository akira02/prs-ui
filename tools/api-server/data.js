const _ = require('lodash')
const shortid = require('shortid')

const NOW = new Date().getTime()
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000

exports.auth = {
    username: 'test',
    password: '123123',
    TOKEN: 'MUCH-TOKEN-WOW'
}

const students = generateUsers('student')
const teachers = generateUsers('teacher')
const users = students.concat(teachers)

const courses = generateCourses(teachers, students)
const assignments = generateAssignments(courses)
const submissions = generateSubmissions(assignments, students)

exports.db = { courses, assignments, submissions }

function generateUsers (role) {
    const result = []

    for (let i = 0; i < 500; ++i) {
        result.push({
            id: shortid.generate(),
            name: `${role} ${i}`,
            role
        })
    }

    return result
}

function generateCourses (teachers, students) {
    const result = []

    for (let i = 0; i < 10; ++i) {
        const teacher = _.sample(teachers)
        const studentSample = _.sampleSize(students, _.random(20, 200))

        result.push({
            id: shortid.generate(),
            name: `Course${i}`,
            description: `Course ${i}, a good course`,
            semester: '105-2',
            teacher: {
                id: teacher.id,
                name: teacher.name,
            },
            students: studentSample,
            attachments: generateAttachments()
        })
    }

    return result
}

function generateAssignments (courses) {
    const result = []

    for (let i = 0; i < 100; ++i) {
        const course = _.sample(courses)

        result.push({
            id: shortid.generate(),
            name: `Assignment ${i}`,
            description: `Assignment ${i}, a good assignment`,
            assigned: date(NOW - _.random(ONE_MONTH)),
            due: date(NOW + _.random(ONE_MONTH)),
            submitted: null,
            course: {
                id: course.id,
                name: course.name
            },
            attachments: generateAttachments()
        })
    }

    return result
}

function generateSubmissions (assignments, students) {
    const result = []

    for (let i = 0; i < 1000; ++i) {
        const assignment = _.sample(assignments)
        const student = _.sample(students)
    
        result.push({
            id: shortid.generate(),
            assignment_id: assignment.id,
            submitted: date(new Date(assignment.assigned).getTime() + _.random(ONE_MONTH)),
            username: student.name,
            link: `http://cool-submission-so-cool-so-prs.com/coolpath/${i}`,
            description: `this is a good submission (${i}), give me an A+, please`,
        })
    }

    return result
}

function generateAttachments () {
    const result = []

    for (let i = 0; i < 5; ++i) {
        result.push({
            type: 'form',
            name: `Good Form ${i}`,
            content: `http://a-good-form-very-good.com.tw/good-form-${i}`,
        })
    }

    return result
}

function date (time) {
    return new Date(time).toISOString()
}