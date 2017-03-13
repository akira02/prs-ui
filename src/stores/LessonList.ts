import { observable, action, IObservableArray } from 'mobx'
import { lessons } from '../api'
import { Auth } from './Auth'
import { LessonStore } from './LessonStore'

export class LessonList {
    private readonly auth: Auth
    @observable stores: IObservableArray<LessonStore> = observable<LessonStore>([])
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
        const stores = response.map(lesson => new LessonStore(this.auth, lesson))
        this.stores.replace(stores)
        this.loading = false
    }
}
