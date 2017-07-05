import {observable, action, observe} from 'mobx'
import * as PageData from './PageData'

import {Auth} from '../Auth'
import {History} from '../History'
import {CourseMap} from '../CourseMap'

export class ViewStore {
    private readonly auth: Auth
    private readonly history: History
    private readonly courseMap: CourseMap

    @observable page: PageData.Page | null = null

    constructor (auth: Auth, history: History, courseMap: CourseMap) {
        this.auth = auth
        this.history = history
        this.courseMap = courseMap
        
        observe(this, 'page', (change) => {
            if (change.oldValue != null && 'dispose' in change.oldValue) {
                change.oldValue.dispose()
            }
        })
    }

    @action
    showLogin () {
        this.page = new PageData.Login(this.auth, this.history)
    }
    
    @action
    async showCourseList () {
        if (!this.requireLogin()) return
        this.page = { name: 'courseList' }
        await this.courseMap.fetch()
    }

    @action
    async showAssignmentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageData.Course(this.courseMap, courseId, {name: 'assignmentList'})
        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchAssignments()
    }

    @action
    async showFormList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageData.Course(this.courseMap, courseId, {name: 'formList'})
        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchForms()
    }

    @action
    async showStudentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageData.Course(this.courseMap, courseId, {name: 'studentList'})
        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchStudents()
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