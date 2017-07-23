import { types, getRoot, getParent, resolveIdentifier } from 'mobx-state-tree'
import { autorun, when } from 'mobx'

import { RootStore } from '../RootStore'
import { CourseModel, Course } from '../Course'
import { AssignmentModel } from '../Assignment'

const LifeCycleModel = types.model(
    'LifeCycle',
    {
        hasEntered: false,
        hasLeft: false
    },
    {
        enter() {
            this.hasEntered = true
        },
        onEnter(listener: () => void) {
            this.disposeOnLeave(when(() => this.hasEntered, listener))
        },
        leave() {
            this.hasLeft = true
        },
        onLeave(listener: () => void) {
            when(() => this.hasLeft, listener)
        },
        disposeOnLeave(dispose: () => void) {
            this.onLeave(dispose)
        }
    }
)

/** 登入頁 */
const LoginPageModel = types.compose(
    'LoginPage',
    LifeCycleModel,
    {
        name: types.literal('login'),
        goBack: false,
        nextPage: '/'
    },
    {
        afterCreate() {
            const { auth, history } = getRoot<RootStore>(this)

            // 監視登入狀態, 一旦登入就執行
            this.disposeOnLeave(
                when(
                    () => this.hasEntered && auth.isLoggedIn,
                    () => {
                        if (this.goBack) {
                            history.goBack()
                        } else {
                            history.push(this.nextPage)
                        }
                    }
                )
            )
        }
    }
)

export type LoginPage = typeof LoginPageModel.Type

/** 課程列表頁 */
const CourseListPageModel = types.compose(
    'CourseListPage',
    LifeCycleModel,
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

/** 學生列表頁 */
export const StudentListPageModel = types.compose(
    'StudentListPage',
    LifeCycleModel,
    {
        name: types.literal('studentList')
    },
    {
        afterCreate() {
            this.disposeOnLeave(
                autorun(() => {
                    const parent = getParent<CoursePage>(this)
                    if (parent.selectedCourse == null) return
                    parent.selectedCourse.fetchStudents()
                })
            )
        }
    }
)

export type StudentListPage = typeof StudentListPageModel.Type

/** 課程評鑑頁 */
export const FormListPageModel = types.compose('FormListPage', LifeCycleModel, {
    name: types.literal('formList')
})

export type FormListPage = typeof FormListPageModel.Type

/** 作業列表頁 */
export const AssignmentListPageModel = types.compose(
    'AssignmentListPage',
    LifeCycleModel,
    {
        name: types.literal('assignmentList'),
        showSubmissions: false,
        assignmentId: types.maybe(types.string),
        get selectedAssignment() {
            if (this.assignmentId == null) return null
            return resolveIdentifier(AssignmentModel, this, this.assignmentId)
        }
    },
    {
        async afterCreate() {
            this.disposeOnLeave(
                autorun(() => {
                    const parent = getParent<CoursePage>(this)
                    if (parent.selectedCourse == null) return
                    parent.selectedCourse.fetchAssignments()
                })
            )

            this.disposeOnLeave(
                autorun(() => {
                    if (this.selectedAssignment == null) return
                    this.selectedAssignment.fetchSubmissions()
                })
            )
        }
    }
)

export type AssignmentListPage = typeof AssignmentListPageModel.Type

const CoursePageModel = types.compose(
    'CoursePage',
    LifeCycleModel,
    {
        name: types.literal('course'),
        courseId: types.string,

        subPage: types.union(
            AssignmentListPageModel,
            FormListPageModel,
            StudentListPageModel
        ),

        get selectedCourse(): Course | null {
            return resolveIdentifier(CourseModel, this, this.courseId)
        }
    },
    {
        afterCreate() {
            this.onEnter(() => {
                getRoot<RootStore>(this).courseStore.fetch()
            })
            this.onEnter(this.subPage.enter)
            this.onLeave(this.subPage.leave)
        }
    }
)

export type CoursePage = typeof CoursePageModel.Type

export const NotFoundPageModel = types.compose('NotFoundPage', LifeCycleModel, {
    name: types.literal('notFound')
})

export type NotFoundPage = typeof NotFoundPageModel.Type

export const PageDataModel = types.union(
    LoginPageModel,
    CourseListPageModel,
    CoursePageModel,
    NotFoundPageModel
)

export type PageData = typeof PageDataModel.Type
