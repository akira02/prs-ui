import { observable, action, IObservableArray } from 'mobx'
import { api } from '../api'
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
        try {
            const response = await api.get('assignments')
                .query({ course_id: this.course.id })
                .auth(this.auth.token)

            this.assignments.replace(response.body.assignments)
        } finally {
            this.loading = false
        }
    }
}