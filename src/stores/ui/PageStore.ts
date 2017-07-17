import {observable, computed, when} from 'mobx'

import {Auth} from '../Auth'
import {History} from '../History'
import {CourseMap} from '../CourseMap'
import {CourseStore} from '../CourseStore'
import {AssignmentStore} from '../AssignmentStore'

/**
 * 用來表示'頁面'的資料結構
 * @export
 * @interface PageStore
 */
export interface PageStore {
    /**
     * 頁面名, 用來區分不同種類頁面
     * 所以每種頁面都要有一個唯一的 name
     * @type {string}
     * @memberof PageStore
     */
    name: string

    /**
     * 離開這個頁面前要做的事
     * @memberof PageStore
     */
    onLeave?: () => void

    /**
     * 允許有任何其他 memeber
     */
    [x: string]: any
}

/**
 * 登入頁
 * @export
 * @class Login
 * @implements {PageStore}
 */
export class Login implements PageStore {
    name: string = "login"
    onLeave: () => void

    constructor (auth: Auth, history: History) {
        // 監視登入狀態, 一旦登入就執行
        const dispose = when('isLoggedIn', () => auth.isLoggedIn, () => {
            // 從 history api 的 `state` 決定登入完要去哪裡
            const {goBack=false, nextPage='/'} = history.location.state || {}
            
            if (goBack) {
                // 如果 state 有指定 goBack, 回到上一頁
                history.goBack()
            } else {
                history.push(nextPage)
            }
        })

        // 離開頁面前取消監視
        this.onLeave = dispose
    }
}

/**
 * 所有 '/course/:courseId/' 下的頁面的 base class
 * 用來提供 selectedCourse
 * @export
 * @abstract
 * @class Course
 * @implements {PageStore}
 */
export abstract class Course implements PageStore {
    private readonly courseMap: CourseMap

    name: string = "course"

    /**
     * 繼承這個 class 的頁面必須指定子頁的名字
     * @abstract
     * @type {string}
     * @memberof Course
     */
    abstract subPage: string

    courseId: string

    constructor (courseMap: CourseMap, courseId: string) {
        this.courseMap = courseMap
        this.courseId = courseId
    }

    /**
     * 使用者選到的 course
     * @readonly
     * @type {(CourseStore | null)}
     * @memberof Course
     */
    @computed get selectedCourse (): CourseStore | null {
        return this.courseMap.courseStores.get(this.courseId) || null
    }
}

/**
 * 學生列表頁
 * @export
 * @class StudentList
 * @extends {Course}
 */
export class StudentList extends Course {
    subPage =  "studentList"
}

/**
 * 課程評鑑頁
 * @export
 * @class StudentList
 * @extends {Course}
 */
export class FormList extends Course {
    subPage = "formList"
}

/**
 * 作業列表頁
 * @export
 * @class StudentList
 * @extends {Course}
 */
export class AssignmentList extends Course {
    subPage = "assignmentList"

    /**
     * 是否顯示 submission 列表 (預設 false)
     * @type {boolean}
     * @memberof AssignmentList
     */
    showSubmissions: boolean = false
}

/**
 * 作業(submission列表)頁
 * @export
 * @class Assignment
 * @extends {AssignmentList}
 */
export class Assignment extends AssignmentList {
    assignmentId: string

    /**
     * 是否顯示 submission 列表 (true)
     * @memberof Assignment
     */
    showSubmissions = true

    constructor (courseMap: CourseMap, courseId: string, assignmentId: string) {
        super(courseMap, courseId)
        this.assignmentId = assignmentId
    }

    /**
     * 使用者選到的作業
     * @readonly
     * @type {(AssignmentStore | null)}
     * @memberof Assignment
     */
    @computed
    get selectedAssignment (): AssignmentStore | null {
        return this.selectedCourse.assignmentStores.get(this.assignmentId) || null
    }
}