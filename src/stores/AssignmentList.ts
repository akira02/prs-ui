import { observable, action, IObservableArray } from 'mobx'
import { assignments } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'

export class AssignmentList {
    private readonly auth: Auth
    @observable assignments: IObservableArray<Assignment> = observable<Assignment>([])
    @observable loading: boolean = false
    @observable open: boolean = false

    @observable assignmentName: string = ''
    @observable assignmentDescription: string = ''
    @observable assignmentData_link: string = ''

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

    @action
    async submit () {
        await assignments.post
            .auth(this.auth.token)
            .params({
                name: this.assignmentName,
                description: this.assignmentDescription,
                data_link: this.assignmentData_link
            })
            .fetch()

        this.assignmentName = ''
        this.assignmentDescription = ''
        this.assignmentData_link = ''
    }
}
