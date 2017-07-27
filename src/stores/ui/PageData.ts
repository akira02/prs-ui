import { types, getRoot, getParent, resolveIdentifier } from 'mobx-state-tree'
import { autorun, when } from 'mobx'

import { RootStore } from '../RootStore'
import { CourseModel, Course } from '../Course'
import { AssignmentModel } from '../Assignment'

/** 頁面的狀態 */
export const LifecycleStateModel = types.union(
    /** 剛創造出來, 還沒進入 */
    types.literal('created'),
    /** 已進入此頁 */
    types.literal('entered'),
    /** 已離開此頁 */
    types.literal('exited')
)

export type LifecycleState = typeof LifecycleStateModel.Type

/** 提供一些控制或監聽頁面狀態的 method */
export const LifecycleModel = types.model(
    'Lifecycle',
    {
        lifecycleState: types.optional(LifecycleStateModel, 'created')
    },
    {
        /** 進入此頁 (若已進入則無動作) */
        enter() {
            if (this.lifecycleState === 'created') {
                this.lifecycleState = 'entered'
            }
        },
        /** 離開此頁 (若已離開則無動作) */
        exit() {
            if (
                this.lifecycleState === 'created' ||
                this.lifecycleState === 'entered'
            ) {
                this.lifecycleState = 'exited'
            }
        },
        /**
         * @returns 一個進入此頁後 resolve 的 Promise
         */
        onEnter(): Promise<void> {
            return new Promise(resolve => {
                this.disposeOnExit(
                    when(() => this.lifecycleState === 'entered', resolve)
                )
            })
        },
        /**
         * @returns 一個離開此頁後 resolve 的 Promise
         */
        onExit(): Promise<void> {
            return new Promise(resolve => {
                when(() => this.lifecycleState === 'exited', resolve)
            })
        },
        /**
         * 離開此頁後呼叫這個 dispose
         * @param dispose 要呼叫的 dispose
         */
        disposeOnExit(dispose: () => void) {
            this.onExit().then(dispose)
        }
    }
)

/** 登入頁 */
export const LoginPageModel = types.compose(
    'LoginPage',
    LifecycleModel,
    {
        name: types.literal('login'),
        /** 登入後是否返回上一頁 (優先於 nextPage) */
        goBack: false,
        /** 登入後要去的下一頁 */
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
    LifecycleModel,
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

/** 學生列表頁 (課程頁的子頁) */
export const StudentListPageModel = types.compose(
    'StudentListPage',
    LifecycleModel,
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

/** 課程評鑑頁 (課程頁的子頁) */
export const FormListPageModel = types.compose('FormListPage', LifecycleModel, {
    name: types.literal('formList')
})

export type FormListPage = typeof FormListPageModel.Type

/** 作業列表頁 (課程頁的子頁) */
export const AssignmentListPageModel = types.compose(
    'AssignmentListPage',
    LifecycleModel,
    {
        name: types.literal('assignmentList'),
        /** 是否顯示 submission 列表 */
        showSubmissions: false,
        /** 使用者選中的作業的 id */
        assignmentId: types.maybe(types.string),
        /** 使用者選中的作業 */
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

/** 課程頁 */
export const CoursePageModel = types.compose(
    'CoursePage',
    LifecycleModel,
    {
        name: types.literal('course'),
        
        /** 子頁 */
        subPage: types.union(
            AssignmentListPageModel,
            FormListPageModel,
            StudentListPageModel
        ),

        /** 使用者選中的課程的 id */
        courseId: types.string,

        /** 使用者選中的課程 */
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

/**
 * CoursePage 的類型
 * @param T 子頁的類型 (預設是所有子頁類型的 union)
 */
export type CoursePage<T = CoursePageType['subPage']> = CoursePageType & {
    subPage: T
}

/** 子頁 */
export const NotFoundPageModel = types.compose('NotFoundPage', LifecycleModel, {
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
