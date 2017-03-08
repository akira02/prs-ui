import { observable } from 'mobx'
import { api } from '../api'

export class AssignmentList {
    @observable assignments: string[] = []
    @observable loading: boolean = false

    async fetch () {
        this.loading = true
        const assignments = await api.get<any>('assignments')
        this.loading = false
    }
}

export const assignmentList = new AssignmentList()