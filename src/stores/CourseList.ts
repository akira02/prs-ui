import { observable, action, IObservableArray } from 'mobx'
import { api } from '../api'
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
        const response = await api.get('courses')
            .auth(this.auth.token)

        const stores = response.body.courses.map(course => new CourseStore(this.auth, course))
        this.stores.replace(stores)
        this.loading = false
    }
}
