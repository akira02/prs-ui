import {Route} from './router'
import {RootStore} from './stores/RootStore'
import {PageDataModel} from './stores/ui/PageData'

export const routes: Route[] =[
    {
        path: '/',
        action: ({redirect}) => redirect.replace('/courses')
    },
    {
        path: '/login',
        action: () => ({ name: 'login' })
    },
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
            child.name = 'course'
            child.courseId = params.courseId
            return child
        },
        children: [
            {
                path: '/',
                action: ({params, redirect}) =>
                    redirect.replace(`/courses/${params.courseId}/assignments`)
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
    {
        path: '*',
        action: () => ({ name: 'notFound' })
    }
]
