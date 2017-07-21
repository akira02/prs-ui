import { Route } from './router'

/** 定義所有路徑 */
export const routes: Route[] = [
    {
        path: '/',
        action: ({ redirect }) => redirect.replace('/courses')
    },
    {
        path: '/login',
        action ({stores}) {
            const state = stores.history.location.state || {}
            return {
                name: 'login',
                goBack: state.goBack,
                nextPage: state.nextPage
            }
        }
    },
    {
        path: '/courses',
        requireLogin: true,
        action: () => ({ name: 'courseList' })
    },
    {
        path: '/courses/:courseId',
        requireLogin: true,
        async action({ params, next }) {
            const child = await next()
            return {
                name: 'course',
                courseId: params.courseId,
                ...child
            }
        },
        children: [
            {
                path: '/',
                action: ({ params, redirect }) =>
                    redirect.replace(`/courses/${params.courseId}/assignments`)
            },
            {
                path: '/assignments',
                action: () => ({
                    subPage: 'assignmentList',
                    showSubmissions: false
                })
            },
            {
                path: '/assignments/:assignmentId',
                action: ({ params }) => ({
                    subPage: 'assignmentList',
                    showSubmissions: true,
                    assignmentId: params.assignmentId
                })
            },
            {
                path: '/forms',
                action: () => ({
                    subPage: 'formList'
                })
            },
            {
                path: '/students',
                action: ({ params }) => ({
                    subPage: 'studentList'
                })
            }
        ]
    },
    {
        path: '*',
        action: () => ({ name: 'notFound' })
    }
]
