import { types, getRoot, getParent, resolveIdentifier } from 'mobx-state-tree'
import { autorun, when } from 'mobx'

import { RootStore } from '../RootStore'
import { CourseModel, Course } from '../Course'
import { AssignmentModel } from '../Assignment'

export const LifeCycleStateModel = types.union(
    types.literal('created'),
    types.literal('entered'),
    types.literal('exited')
)

export type LifeCycleState = typeof LifeCycleStateModel.Type

export const LifeCycleModel = types.model(
    'LifeCycle',
    {
        lifeCycleState: types.optional(LifeCycleStateModel, 'created')
    },
    {
        enter() {
            if (this.lifeCycleState === 'created') {
                this.lifeCycleState = 'entered'
            }
        },
        exit() {
            if (
                this.lifeCycleState === 'created' ||
                this.lifeCycleState === 'entered'
            ) {
                this.lifeCycleState = 'exited'
            }
        },
        onEnter(): Promise<void> {
            return new Promise(resolve => {
                this.disposeOnExit(
                    when(() => this.lifeCycleState === 'entered', resolve)
                )
            })
        },
        onExit(): Promise<void> {
            return new Promise(resolve => {
                when(() => this.lifeCycleState === 'exited', resolve)
            })
        },
        disposeOnExit(dispose: () => void) {
            this.onExit().then(dispose)
        }
    }
)

/** 登入頁 */
export const LoginPageModel = types.compose(
    'LoginPage',
    LifeCycleModel,
    {
        name: types.literal('login'),
        goBack: false,
        nextPage: '/'
    },
    {
        async afterCreate() {
            await this.onEnter()
            const { auth, history } = getRoot<RootStore>(this)
            const disposer = when(
                () => auth.isLoggedIn,
                () => {
                    if (this.goBack) {
                        history.goBack()
                    } else {
                        history.push(this.nextPage)
                    }
                }
            )
        }
    }
)

export type LoginPage = typeof LoginPageModel.Type

/** 課程列表頁 */
export const CourseListPageModel = types.compose(
    'CourseListPage',
    LifeCycleModel,
    {
        name: types.literal('courseList')
    },
    {
        async afterCreate() {
            await this.onEnter()
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
        async afterCreate() {
            await this.onEnter()
            this.disposeOnExit(
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
            await this.onEnter()

            this.disposeOnExit(
                autorun(() => {
                    const parent = getParent<CoursePage>(this)
                    if (parent.selectedCourse == null) return
                    parent.selectedCourse.fetchAssignments()
                })
            )

            this.disposeOnExit(
                autorun(() => {
                    if (this.selectedAssignment == null) return
                    this.selectedAssignment.fetchSubmissions()
                })
            )
        }
    }
)

export type AssignmentListPage = typeof AssignmentListPageModel.Type

export const CoursePageModel = types.compose(
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
        async afterCreate() {
            await this.onEnter()
            getRoot<RootStore>(this).courseStore.fetch()
            this.subPage.enter()

            await this.onExit()
            this.subPage.exit()
        }
    }
)

type CoursePageType = typeof CoursePageModel.Type

export type CoursePage<T = CoursePageType['subPage']> = CoursePageType & {
    subPage: T
}

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
