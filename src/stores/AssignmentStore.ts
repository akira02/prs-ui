import { observable, computed, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Auth } from './Auth'

import { Assignment } from '../models/Assignment'
import { Submission } from '../models/Submission'
import { Attachment } from '../models/Attachment'

export class AssignmentStore {
    private readonly auth: Auth
    
    /**
     * Assignment 本身的資料
     * @type {Assignment}
     * @memberof AssignmentStore
     */
    @observable assignment: Assignment

    /**
     * Submission 列表
     * @type {Submission[]}
     * @memberof AssignmentStore
     */
    @observable submissions: Submission[] = []

    /**
     * 問卷列表
     * @readonly
     * @type {Attachment[]}
     * @memberof AssignmentStore
     */
    @computed
    get forms (): Attachment[] {
        if (this.assignment.attachments == null) return []
        return this.assignment.attachments
            .filter(attachment => attachment.type == 'form')
    }

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