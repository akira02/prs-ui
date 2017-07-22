import { types, getRoot, resolveIdentifier } from 'mobx-state-tree'
import { autorun, when } from 'mobx'

import { RootStore } from '../RootStore'
import { CourseModel, Course } from '../Course'
import { AssignmentModel } from '../Assignment'

const PageBase = types.model(
    'PageBase',
    {
        hasLeft: false
    },
    {
        leave() {
            this.hasLeft = true
        }
    }
)

/** 登入頁 */
const LoginPageModel = types.compose(
    'LoginPage',
    PageBase,
    {
        name: types.literal('login'),
        goBack: false,
        nextPage: '/'
    },
    {
        afterCreate() {
            const { auth, history } = getRoot<RootStore>(this)

            // 監視登入狀態, 一旦登入就執行
            const dispose = when(
                'isLoggedIn',
                () => auth.isLoggedIn,
                () => {
                    if (this.goBack) {
                        history.goBack()
                    } else {
                        history.push(this.nextPage)
                    }
                }
            )

            when(() => this.hasLeft, dispose)
        }
    }
)

export type LoginPage = typeof LoginPageModel.Type

/** 課程列表頁 */
const CourseListPageModel = types.compose(
    'CourseListPage',
    PageBase,
    {
        name: types.literal('courseList')
    },
    {
        afterCreate() {
            const { courseStore } = getRoot<RootStore>(this)
            courseStore.fetch()
        }
    }
)

export type CourseListPage = typeof CourseListPageModel.Type

/** /courses/:courseId 下的頁面的 base type */
const CoursePageBase = types.compose('CoursePageBase', PageBase, {
    name: types.literal('course'),
    courseId: types.string,
    get selectedCourse(): Course | null {
        return resolveIdentifier(CourseModel, this, this.courseId)
    }
})

/** 學生列表頁 */
export const StudentListPageModel = types.compose(
    'StudentListPage',
    CoursePageBase,
    {
        subPage: types.literal('studentList')
    },
    {
        async afterCreate() {
            const { courseStore } = getRoot<RootStore>(this)
            await courseStore.fetch()

            const dispose = autorun(() => {
                if (this.selectedCourse == null) return
                this.selectedCourse.fetchStudents()
            })
            when(() => this.hasLeft, dispose)
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
        afterCreate() {
            const { courseStore } = getRoot<RootStore>(this)
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
        showSubmissions: types.literal(false)
    },
    {
        async afterCreate() {
            const { courseStore } = getRoot<RootStore>(this)
            await courseStore.fetch()

            const dispose = autorun(() => {
                if (this.selectedCourse == null) return
                this.selectedCourse.fetchAssignments()
            })
            when(() => this.hasLeft, dispose)
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
        get selectedAssignment() {
            return resolveIdentifier(AssignmentModel, this, this.assignmentId)
        }
    },
    {
        async afterCreate() {
            const { courseStore } = getRoot<RootStore>(this)
            courseStore.fetch()

            {
                const dispose = autorun(() => {
                    if (this.selectedCourse == null) return
                    this.selectedCourse.fetchAssignments()
                })
                when(() => this.hasLeft, dispose)
            }

            {
                const dispose = autorun(() => {
                    if (this.selectedAssignment == null) return
                    this.selectedAssignment.fetchSubmissions()
                })
                when(() => this.hasLeft, dispose)
            }
        }
    }
)

export type AssignmentPage = typeof AssignmentPageModel.Type

export const NotFoundPageModel = types.compose('NotFoundPage', PageBase, {
    name: types.literal('notFound')
})

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

export type CoursePage =
    | AssignmentListPage
    | StudentListPage
    | FormListPage
    | AssignmentPage
