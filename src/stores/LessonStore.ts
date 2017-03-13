import { observable, action, IObservableArray } from 'mobx'
import { assignments } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'
import { Lesson } from '../models/Lesson'


export class LessonStore {
    private readonly auth: Auth
    @observable lesson: Lesson
    @observable loading: boolean = false
    @observable assignments: IObservableArray<Assignment> = observable<Assignment>([])
    constructor (auth: Auth, lesson: Lesson) {
        this.auth = auth
        this.lesson = lesson
    }
    @action
    async fetchAssignments () {
        this.loading = true
        const response = await assignments.get
            .params({ lesson_id: this.lesson.id })
            .auth(this.auth.token)
            .fetch()
        this.assignments.replace(response)
        this.loading = false
    }
}