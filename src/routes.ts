import {Stores} from './stores'

interface Context {
    params: any,
    stores: Stores
}

/**
 * 定義 route 的資料格式
 * @export
 * @interface Route
 */
export interface Route {
    /**
     * 用來跟 url 比對的字串
     * @type {string}
     * @memberof Route
     */
    path: string

    /**
     * 比成功要執行的動作
     * @memberof Route
     */
    action?: (ctx: Context) => void

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
     * @type {Route[]}
     * @memberof Route
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
}

/**
 * 指定瀏覽到各個 path 時, 要執行的動作, 如呼叫 viewStore 更新頁面
 * 前面的優先於後面的
 * 注意如果某個 route 有定義 action, router 不會執行他的 children
 * 解決方法是在他的 children 裡新增一個 path 是 '/' 的 route, 然後把他的 action 移到那裡
 */
export const routes: Route[] =[
    { path: '/',        action: redirect('/courses') },
    { path: '/login',   action: ({stores}) => stores.viewStore.showLogin() },
    { path: '/courses', action: ({stores}) => stores.viewStore.showCourseList() },
    {
        path: '/courses/:courseId',
        children: [
            {
                path: '/',
                action ({params, stores}) {
                    stores.history.replace(`/courses/${params.courseId}/assignments`)
                }
            },
            {
                path: '/assignments',
                action: ({params, stores}) => stores.viewStore.showAssignmentList(params.courseId)
            },
            {
                path: '/assignments/:assignmentId',
                action: ({params, stores}) =>
                    stores.viewStore.showAssignment(params.courseId, params.assignmentId)
            },
            {
                path: '/forms',
                action: ({params, stores}) => stores.viewStore.showFormList(params.courseId)
            },
            {
                path: '/students',
                action: ({params, stores}) => stores.viewStore.showStudentList(params.courseId)
            },
        ]
    },
    { path: '*', action: ({stores}) => stores.viewStore.showNotFound() }
]
