import {Stores} from './stores'

interface Context {
    params: any,
    stores: Stores
}

export interface Route {
    path: string
    action?: (ctx: Context) => void
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
 */
export const routes: Route[] = [
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
