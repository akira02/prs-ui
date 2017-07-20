import {RootStore} from './stores/RootStore'
import {PageDataModel} from './stores/ui/PageData'

interface Context {
    params: any,
    stores: RootStore,
    next: Function
}

type ActionResult = boolean | Partial<typeof PageDataModel.SnapshotType>
type Action = (ctx: Context) => ActionResult | Promise<ActionResult>

/**
 * 定義 route 的資料格式
 * @export
 * @interface Route
 */
export interface Route {
    /** 用來跟 url 比對的字串 */
    path: string

    /** 生成 PageData 的 function */
    action?: Action

    /** 頁面是否需要登入 (也會作用到children) */
    requireLogin?: boolean

    /**
     * children 裡的 route 會用前面比對之後剩下部分繼續比對
     * 比如
     * {
     *     path: '/aaa',
     *     children: {
     *         path: '/bbb'
     *     }
     * }
     * 能比對到 '/aaa/bbb'
     */
    children?: Route[]
}

/**
 * 讓重導向稍微好寫一點的東東
 * @param {string} path 重導向的目標頁面
 * @param {*} [state] 要傳給下個頁面的 state
 * @returns 一個 action, 重導向到指定的頁面
 */
const redirect = (path: string, state?: any) => ({stores}: Context) => {
    stores.history.replace(path, state)
    // 回傳一個非 null 的值讓 router 停下來
    return true
}

export const routes: Route[] =[
    { path: '/',        action: redirect('/courses') },
    { path: '/login',   action: () => ({ name: 'login' }) },
    {
        path: '/courses',
        requireLogin: true,
        action: () => ({ name: 'courseList' })
    },
    {
        path: '/courses/:courseId',
        requireLogin: true,
        async action ({params, next}) {
            const child = await next()
            if (child == true) return true
            child.name = 'course'
            child.courseId = params.courseId
            return child
        },
        children: [
            {
                path: '/',
                action ({params, stores}) {
                    stores.history.replace(`/courses/${params.courseId}/assignments`)
                    return true
                }
            },
            {
                path: '/assignments',
                action: () => ({
                    subPage: 'assignmentList',
                    showSubmissions: false,
                })
            },
            {
                path: '/assignments/:assignmentId',
                action: ({params}) => ({
                    subPage: 'assignmentList',
                    showSubmissions: true,
                    assignmentId: params.assignmentId
                })
            },
            {
                path: '/forms',
                action: () => ({
                    subPage: 'formList',
                })
            },
            {
                path: '/students',
                action: ({params}) => ({
                    subPage: 'studentList'
                })
            },
        ]
    },
    { path: '*', action: () => ({ name: 'notFound' }) }
]
