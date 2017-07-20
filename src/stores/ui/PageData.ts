import {types, getRoot, resolveIdentifier, addDisposer} from 'mobx-state-tree'
import {autorun, when} from 'mobx'

import {RootStore} from '../RootStore'
import {CourseModel, Course} from '../Course'
import {AssignmentModel} from '../Assignment'

/** 登入頁 */
const LoginPageModel = types.model(
    'LoginPage',
    {
        name: types.literal('login')
    },
    {
        afterAttach () {
            const {auth, history} = getRoot<RootStore>(this)

            // 監視登入狀態, 一旦登入就執行
            addDisposer(this, when('isLoggedIn', () => auth.isLoggedIn, () => {
                // 從 history api 的 `state` 決定登入完要去哪裡
                const {goBack=false, nextPage='/'} = history.location.state || {}
                
                if (goBack) {
                    // 如果 state 有指定 goBack, 回到上一頁
                    history.goBack()
                } else {
                    history.push(nextPage)
                }
            }))
        }
    }
)

export type LoginPage = typeof LoginPageModel.Type



/** 課程列表頁 */
const CourseListPageModel = types.model(
    'CourseListPage',
    {
        name: types.literal('courseList')
    },
    {
        afterAttach () {
            const {courseStore} = getRoot<RootStore>(this)
            courseStore.fetch()
        },
    }
)

export type CourseListPage = typeof CourseListPageModel.Type

export interface CoursePage {
    name: 'course'
    subPage: string
    selectedCourse: Course
}

/** /courses/:courseId 下的頁面的 base type */
const CoursePageBase = types.model(
    'CoursePageBase',
    {
        name: types.literal('course'),
        courseId: types.string,
        get selectedCourse (): Course | null {
            return resolveIdentifier(CourseModel, this, this.courseId)
        }
    }
)

/** 學生列表頁 */
export const StudentListPageModel = types.compose(
    'StudentListPage',
    CoursePageBase,
    {
        subPage: types.literal('studentList')
    },
    {
        async afterAttach () {
            const {courseStore} = getRoot<RootStore>(this)
            await courseStore.fetch()
            
            addDisposer(this, autorun(() => {
                if (this.selectedCourse == null) return
                this.selectedCourse.fetchStudents()
            }))
        }
    }
)

export type StudentListPage = typeof StudentListPageModel.Type

/** 課程評鑑頁 */
export const FormListPageModel = types.compose(
    'FormListPage',
    CoursePageBase,
    {
        subPage: types.literal('formList')
    },
    {
        afterAttach () {
            const {courseStore} = getRoot<RootStore>(this)
            courseStore.fetch()      
        }
    }
)

export type FormListPage = typeof FormListPageModel.Type

/** 作業列表頁 */
export const AssignmentListPageModel = types.compose(
    'AssignmentListPage',
    CoursePageBase,
    {
        subPage: types.literal('assignmentList'),
        showSubmissions: types.literal(false),
    },
    {
        async afterAttach () {
            const {courseStore} = getRoot<RootStore>(this)
            await courseStore.fetch()

            addDisposer(this, autorun(() => {
                if (this.selectedCourse == null) return
                this.selectedCourse.fetchAssignments()
            }))
        }
    }
)

export type AssignmentListPage = typeof AssignmentListPageModel.Type

/** 作業(submission列表)頁 */
export const AssignmentPageModel = types.compose(
    'AssignmentPage',
    CoursePageBase,
    {
        subPage: types.literal('assignmentList'),
        showSubmissions: types.literal(true),
        assignmentId: types.string,
        get selectedAssignment () {
            return resolveIdentifier(AssignmentModel, this, this.assignmentId)
        }
    },
    {
        async afterAttach () {
            const {courseStore} = getRoot<RootStore>(this)
            courseStore.fetch()
            
            addDisposer(this, autorun(() => {
                if (this.selectedCourse == null) return
                this.selectedCourse.fetchAssignments()
            }))
            
            addDisposer(this, autorun(() => {
                if (this.selectedAssignment == null) return
                this.selectedAssignment.fetchSubmissions()
            }))
        },
        
    }
)

export type AssignmentPage = typeof AssignmentPageModel.Type

export const NotFoundPageModel = types.model(
    'NotFoundPage',
    {
        name: types.literal('notFound')
    }
)

export type NotFoundPage = typeof NotFoundPageModel.Type

export const PageDataModel = types.union(
    LoginPageModel,
    CourseListPageModel,
    AssignmentListPageModel,
    StudentListPageModel,
    FormListPageModel,
    AssignmentPageModel,
    NotFoundPageModel
)

export type PageData = typeof PageDataModel.Type