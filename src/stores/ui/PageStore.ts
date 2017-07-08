import {observable, computed, when} from 'mobx'

import {Auth} from '../Auth'
import {History} from '../History'
import {CourseMap} from '../CourseMap'
import {CourseStore} from '../CourseStore'
import {AssignmentStore} from '../AssignmentStore'

export interface PageStore {
    name: string
    onLeave?: () => void

    [x: string]: any
}

export class Login implements PageStore {
    name: string = "login"
    onLeave: () => void

    constructor (auth: Auth, history: History) {
        const dispose = when('isLoggedIn', () => auth.isLoggedIn, () => {
            const {goBack=false, nextPage='/'} = history.location.state || {}
            if (goBack) {
                history.goBack()
            } else {
                history.push(nextPage)
            }
        })

        this.onLeave = dispose
    }
}

export abstract class Course implements PageStore {
    private readonly courseMap: CourseMap

    name: string = "course"
    abstract subPage: string

    courseId: string

    constructor (courseMap: CourseMap, courseId: string) {
        this.courseMap = courseMap
        this.courseId = courseId
    }

    @computed get selectedCourse (): CourseStore | null {
        return this.courseMap.courseStores.get(this.courseId) || null
    }
}


export class StudentList extends Course {
    subPage =  "studentList"
}
export class FormList extends Course {
    subPage = "formList"
}

export class AssignmentList extends Course {
    subPage = "assignmentList"
    showSubmissions: boolean = false
}

export class Assignment extends AssignmentList {
    assignmentId: string
    showSubmissions = true

    constructor (courseMap: CourseMap, courseId: string, assignmentId: string) {
        super(courseMap, courseId)
        this.assignmentId = assignmentId
    }

    @computed
    get selectedAssignment (): AssignmentStore | null {
        return this.selectedCourse.assignmentStores.get(this.assignmentId) || null
    }
}