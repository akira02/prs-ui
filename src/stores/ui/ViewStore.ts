import {observable, action, observe} from 'mobx'
import * as PageStore from './PageStore'

import {Auth} from '../Auth'
import {History} from '../History'
import {CourseMap} from '../CourseMap'

export class ViewStore {
    private readonly auth: Auth
    private readonly history: History
    private readonly courseMap: CourseMap

    @observable page: PageStore.PageStore | null = null

    constructor (auth: Auth, history: History, courseMap: CourseMap) {
        this.auth = auth
        this.history = history
        this.courseMap = courseMap
        
        observe(this, 'page', (change) => {
            if (change.oldValue != null && typeof change.oldValue.onLeave == 'function') {
                change.oldValue.onLeave()
            }
        })
    }

    @action
    showLogin () {
        this.page = new PageStore.Login(this.auth, this.history)
    }
    
    @action
    async showCourseList () {
        if (!this.requireLogin()) return
        this.page = {name: 'courseList'}

        await this.courseMap.fetch()
    }

    @action
    async showAssignmentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.AssignmentList(this.courseMap, courseId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchAssignments()
    }

    @action
    async showFormList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.FormList(this.courseMap, courseId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchForms()
    }

    @action
    async showStudentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.StudentList(this.courseMap, courseId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchStudents()
    }

    @action
    async showAssignment (courseId: string, assignmentId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.Assignment(this.courseMap, courseId, assignmentId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchAssignments() 
        await this.page.selectedAssignment.fetchSubmissions()
    }

    @action
    async showNotFound () {
        this.page = { name: 'notFound' }
    }

    @action
    private requireLogin (): boolean {
        if (this.auth.isLoggedIn) return true
        this.history.push('/login', { goBack: true })
        return false
    }
}