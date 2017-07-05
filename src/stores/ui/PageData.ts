import {observable, computed} from 'mobx'
import {CourseMap} from '../CourseMap'
import {CourseStore} from '../CourseStore'

export type Page =
    Login |
    NotFound |
    CourseList |
    Course

export interface Login {
    name: "login"
}
export interface NotFound {
    name: "notFound"
}
export interface CourseList {
    name: "courseList"
}

export class Course {
    private readonly courseMap: CourseMap

    @observable name: "course" = "course"
    @observable courseId: string
    @observable subPage: Course.SubPage

    constructor (courseMap: CourseMap, courseId: string, subPage: Course.SubPage) {
        this.courseMap = courseMap
        this.courseId = courseId
        this.subPage = subPage
    }

    @computed get selectedCourse (): CourseStore | null {
        return this.courseMap.courseStores.get(this.courseId) || null
    }
}

export namespace Course {
    export type SubPage = AssignmentList | FormList | StudentList

    export interface AssignmentList {
        name: "assignmentList"
    }
    export interface FormList {
        name: "formList"
    }
    export interface StudentList {
        name: "studentList"
    }
}
