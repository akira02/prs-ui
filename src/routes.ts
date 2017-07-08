import {Stores} from './stores'

interface Context {
    params: any,
    stores: Stores
}

export interface Route {
    name?: string
    path: string
    action?: (ctx: Context) => void
    children?: Route[]
}

const redirect = (path: string, state?: any) => ({stores}: Context) => {
    stores.history.replace(path, state)
}

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
