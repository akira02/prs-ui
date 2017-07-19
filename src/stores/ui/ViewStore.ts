import {observable, action, observe} from 'mobx'
import * as PageStore from './PageStore'

import {Auth} from '../Auth'
import {History} from '../History'
import {CourseMap} from '../CourseMap'

/**
 * 用來儲存 view (react) 中需要全域分享的資料
 * @export
 * @class ViewStore
 */
export class ViewStore {
    private readonly auth: Auth
    private readonly history: History
    private readonly courseMap: CourseMap

    /**
     * 目前的頁面
     * @type {(PageStore.PageStore | null)}
     * @memberof ViewStore
     */
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

    /**
     * 顯示登入頁
     * @memberof ViewStore
     */
    @action
    showLogin () {
        this.page = new PageStore.Login(this.auth, this.history)
    }

    /**
     * 顯示課程列表頁
     * @memberof ViewStore
     */
    @action
    async showCourseList () {
        if (!this.requireLogin()) return
        this.page = {name: 'courseList'}

        await this.courseMap.fetch()
    }

    /**
     * 顯示作業列表頁
     * @param {string} courseId 選擇的課程
     * @memberof ViewStore
     */
    @action
    async showAssignmentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.AssignmentList(this.courseMap, courseId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchAssignments()
    }

    /**
     * 顯示課程評鑑列表頁
     * @param {string} courseId 選擇的課程
     * @memberof ViewStore
     */
    @action
    async showFormList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.FormList(this.courseMap, courseId)

        await this.courseMap.fetch()
    }

    /**
     * 顯示學生列表頁
     * @param {string} courseId 選擇的課程
     * @memberof ViewStore
     */
    @action
    async showStudentList (courseId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.StudentList(this.courseMap, courseId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchStudents()
    }

   /**
    * 顯示課程詳細資料(submission列表)頁
    * @param {string} courseId 選擇的課程
    * @param {string} assignmentId 選擇的作業
    * @memberof ViewStore
    */
    @action
    async showAssignment (courseId: string, assignmentId: string) {
        if (!this.requireLogin()) return
        this.page = new PageStore.Assignment(this.courseMap, courseId, assignmentId)

        await this.courseMap.fetch()
        await this.page.selectedCourse.fetchAssignments() 
        await this.page.selectedAssignment.fetchSubmissions()
    }


    /**
     * 顯示 404 頁
     * @memberof ViewStore
     */
    @action
    async showNotFound () {
        this.page = { name: 'notFound' }
    }

    /**
     * 檢查是否已經登入, 若已登入則回傳 true, 否則回傳 false 並導向登入頁
     * @private
     * @returns {boolean} 是否已經登入
     * @memberof ViewStore
     */
    @action
    private requireLogin (): boolean {
        if (this.auth.isLoggedIn) return true
        this.history.push('/login', { goBack: true })
        return false
    }
}