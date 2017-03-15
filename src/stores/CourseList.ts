import { observable, action, IObservableArray } from 'mobx'
import { courses } from '../api'
import { Auth } from './Auth'
import { CourseStore } from './CourseStore'

export class CourseList {
    private readonly auth: Auth
    @observable stores: IObservableArray<CourseStore> = observable<CourseStore>([])
    @observable loading: boolean = false

    constructor (auth: Auth) {
        this.auth = auth
    }

    @action
    async fetch () {
        this.loading = true
        const response = await courses.get
            .auth(this.auth.token)
            .fetch()
        const stores = response.map(course => new CourseStore(this.auth, course))
        this.stores.replace(stores)
        this.loading = false
    }
}
