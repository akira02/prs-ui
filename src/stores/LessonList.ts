import { observable, action, ObservableMap } from 'mobx'
import { lessons } from '../api'
import { Auth } from './Auth'
import { LessonStore } from './LessonStore'

export class LessonList {
    private readonly auth: Auth
    @observable lessons: ObservableMap<LessonStore> = observable.map<LessonStore>()
    @observable loading: boolean = false

    constructor (auth: Auth) {
        this.auth = auth
    }
    @action
    async fetch () {
        this.loading = true
        const response = await lessons.get
            .auth(this.auth.token)
            .fetch()
        for (const lesson of response) {
            if (this.lessons.has(lesson.id)) {
                this.lessons.get(lesson.id).lesson = lesson
            } else {
                this.lessons.set(lesson.id, new LessonStore(this.auth, lesson))
            }
        }
        this.loading = false
    }
}
