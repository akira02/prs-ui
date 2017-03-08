import { observable } from 'mobx'
import { api } from '../api'
import { auth } from './auth'
import { Assignment } from '../model/Assignment'

export class AssignmentList {
    @observable assignments: Assignment[] = []
    @observable loading: boolean = false

    async post (name: string, data_link: string) {
        await api.post<void>('assignments', {name, data_link, token: auth.token})
        await this.fetch()
    }

    async fetch () {
        this.loading = true
        this.assignments = await api.get<Assignment[]>('assignments', {token: auth.token})
        this.loading = false
    }
}

export const assignmentList = new AssignmentList()