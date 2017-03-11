import { observable, IObservableArray } from 'mobx'
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

    async fetch () {
        this.loading = true
        const response = await assignments.get
            .auth(this.auth.token)
            .fetch()
        this.assignments.replace(response)
        this.loading = false
    }
}
