import {observable} from 'mobx'
import {CourseStore} from '../CourseStore'

export type PageData =
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

export interface Course {
    name: "course"
    selectedCourse: CourseStore | null
    subPage: Course.SubPage | null
}

export namespace Course {
    export type SubPage = Assignments | Forms | Students

    export interface Assignments {
        name: "assignments"
    }
    export interface Forms {
        name: "forms"
    }
    export interface Students {
        name: "students"
    }
}
