import { observable, action, IObservableArray } from 'mobx'
import { assignments } from '../api'
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
            const response = await assignments.get
                .auth(this.auth.token)
                .fetch()
            this.assignments.replace(response.assignments)
        } finally {
            this.loading = false
        }
    }
}
