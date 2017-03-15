import { observable, action, IObservableArray } from 'mobx'
import { assignments } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'
import { Course } from '../models/Course'


export class CourseStore {
    private readonly auth: Auth
    @observable course: Course
    @observable expanded: boolean = false
    @observable loading: boolean = false
    @observable assignments: IObservableArray<Assignment> = observable<Assignment>([])
    constructor (auth: Auth, course: Course) {
        this.auth = auth
        this.course = course
    }
    @action
    async fetchAssignments () {
        this.loading = true
        const response = await assignments.get
            .params({ course_id: this.course.id })
            .auth(this.auth.token)
            .fetch()
        this.assignments.replace(response)
        this.loading = false
    }
}