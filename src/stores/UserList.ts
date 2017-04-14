import { observable, computed, action, IObservableArray } from 'mobx'
import { api } from '../api'
import { Auth } from './Auth'

import { User } from '../models/User'

export class UserList {
    private readonly auth: Auth
    @observable allUsers: IObservableArray<User> = observable<User>([])
    @observable loading: boolean = false
    @observable role: string = 'all'

    constructor (auth: Auth) {
        this.auth = auth
    }

    @computed
    get users (): User[] {
        if (this.role == 'all') return this.allUsers
        return this.allUsers.filter(user => user.role == this.role)
    }

    @action
    async fetch () {
        this.loading = true
        const response = await api.get('users')
            .auth(this.auth.token)
        this.allUsers.replace(response.body)
        this.loading = false
    }
}
