import { observable, action, IObservableArray } from 'mobx'
import { users } from '../api'
import { Auth } from './Auth'

import { User } from '../models/User'

export class UserList {
    private readonly auth: Auth
    @observable users: IObservableArray<User> = observable<User>([])
    @observable loading: boolean = false

    constructor (auth: Auth) {
        this.auth = auth
    }

    @action
    async fetch () {
        this.loading = true
        const response = await users.get
            .auth(this.auth.token)
            .fetch()
        this.users.replace(response)
        this.loading = false
    }
}
