import { observable, action } from 'mobx'
import { assignments } from '../api'
import { Auth } from './Auth'
import { Assignment } from '../models/Assignment'

export class AssignmentInput {
    private readonly auth: Auth
    @observable open: boolean = false

    @observable name: string = ''
    @observable description: string = ''
    @observable data_link: string = ''

    constructor (auth: Auth) {
        this.auth = auth
    }

    @action
    async submit () {
        await assignments.post
            .auth(this.auth.token)
            .params({
                name: this.name,
                description: this.description,
                data_link: this.data_link
            })
            .fetch()
    }

    @action
    clear () {
        this.name = ''
        this.description = ''
        this.data_link = ''
    }
}
