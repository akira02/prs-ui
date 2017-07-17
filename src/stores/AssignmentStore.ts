import { observable, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Auth } from './Auth'

import { Assignment } from '../models/Assignment'
import { Submission } from '../models/Submission'

export class AssignmentStore {
    private readonly auth: Auth

    @observable assignment: Assignment
    @observable submissions: Submission[] = []

    constructor (auth: Auth, assignment: Assignment) {
        this.auth = auth
        this.assignment = assignment
    }

    /**
     * 抓取這個 assignment 的 submission 列表
     * @memberof AssignmentStore
     */
    async fetchSubmissions () {
        const response = await api.get('submissions')
            .query({ assignment_id: this.assignment.id })
            .auth(this.auth.token)

        this.submissions = response.body.submissions
    }
}