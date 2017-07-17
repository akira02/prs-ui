import { observable, computed, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Auth } from './Auth'
import { AssignmentStore } from './AssignmentStore'

import { Assignment } from '../models/Assignment'
import { Course } from '../models/Course'
import { User } from '../models/User'

/**
 * 用來儲存 course 資料, 和他的子資料 (屬於該 course 的 assignment 等等)
 * @export
 * @class CourseStore
 */
export class CourseStore {
    private readonly auth: Auth
    /**
     * Course 本身的資料
     * @type {Course}
     * @memberof CourseStore
     */
    @observable course: Course

    /**
     * 屬於該 course 的 assignment
     * @type {ObservableMap<AssignmentStore>}
     * @memberof CourseStore
     */
    @observable assignmentStores: ObservableMap<AssignmentStore> = new ObservableMap<AssignmentStore>()
    
    /**
     * 屬於該 course 的學生列表
     * @type {User[]}
     * @memberof CourseStore
     */
    @observable students: User[] = []

    // TODO: add type
    /**
     * 屬於該 course 的問卷列表 (課程評鑑問卷)
     * @type {any[]}
     * @memberof CourseStore
     */
    @observable forms: any[] = []

    constructor (auth: Auth, course: Course) {
        this.auth = auth
        this.course = course
    }

    /**
     * 從 api 抓取 assignment 列表並更新
     * @memberof CourseStore
     */
    async fetchAssignments () {
        const response = await api.get('assignments')
            .query({ course_id: this.course.id })
            .auth(this.auth.token)
        this.updateAssignments(response.body.assignments)
    }

    /**
     * 用來更新 assignment 列表的 action
     * @private
     * @param {Assignment[]} assignments 新的 assignment 列表
     * @memberof CourseStore
     */
    @action
    private updateAssignments (assignments: Assignment[]) {
        const newAssignments = new Map(assignments.map<[string, Assignment]>(value => [value.id, value]))

        // 刪除新列表裡沒有, 但本地有的 assignment
        for (let key of this.assignmentStores.keys()) {
            if (!newAssignments.has(key)) {
                this.assignmentStores.delete(key)
            }
        }

        newAssignments.forEach((assignment, key) => {
            const assignmentStore = this.assignmentStores.get(key)
            
            if (assignmentStore != null) {
                // 如果已經存在同 id 的 AssignmentStore, 則直接更新他的資料
                assignmentStore.assignment = assignment
            } else {
                // 如果沒有同 id 的 AssignmentStore, 創造一個新的並加到 assignmentStores 裡
                this.assignmentStores.set(key, new AssignmentStore(this.auth, assignment))
            }
        })
    }

    /**
     * 從 api 抓取學生列表並更新
     * @memberof CourseStore
     */
    @action
    async fetchStudents () {
        const response = await api.get('users')
            .query({ role: 'student', course_id: this.course.id })
            .auth(this.auth.token)
        this.students = response.body
    }

    /**
     * 從 api 抓取課程評鑑列表並更新
     * @memberof CourseStore
     */
    @action fetchForms () {
        //TODO: fetch forms from server
    }
}