import { observable } from 'mobx'
import { api } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'

export class AssignmentList {
    private readonly auth: Auth
    @observable assignments: Assignment[] = []
    @observable loading: boolean = false

    constructor (auth: Auth) {
        this.auth = auth
    }

    async post (name: string, data_link: string) {
        await api.post<void>('assignments', {name, data_link, token: this.auth.token})
        await this.fetch()
    }

    async fetch () {
        this.loading = true
        this.assignments = await api.get<Assignment[]>('assignments', {token: this.auth.token})
        this.loading = false
    }
}