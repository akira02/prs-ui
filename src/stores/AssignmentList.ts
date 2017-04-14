import { observable, action, IObservableArray } from 'mobx'
import { api } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'

export class AssignmentList {
    private readonly auth: Auth
    @observable assignments: IObservableArray<Assignment> = observable<Assignment>([])
    @observable loading: boolean = false

    constructor (auth: Auth) {
        this.auth = auth
    }

    @action
    async fetch () {
        this.loading = true
        try {
            const response = await api.get('assignments')
                .auth(this.auth.token)

            this.assignments.replace(response.body.assignments)
        } finally {
            this.loading = false
        }
    }
}
