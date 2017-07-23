import { Route } from './router'

/** 定義所有路徑 */
export const routes: Route[] = [
    {
        path: '/',
        action: ({ redirect }) => redirect.replace('/courses')
    },
    {
        path: '/login',
        action: ({ stores }) => {
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
        action: async ({ params, next }) => ({
            name: 'course',
            courseId: params.courseId,
            subPage: await next()
        }),
        children: [
            {
                path: '/',
                action: ({ params, redirect }) =>
                    redirect.replace(`/courses/${params.courseId}/assignments`)
            },
            {
                path: '/assignments',
                action: () => ({
                    name: 'assignmentList',
                    showSubmissions: false
                })
            },
            {
                path: '/assignments/:assignmentId',
                action: ({ params }) => ({
                    name: 'assignmentList',
                    showSubmissions: true,
                    assignmentId: params.assignmentId
                })
            },
            {
                path: '/forms',
                action: () => ({ name: 'formList' })
            },
            {
                path: '/students',
                action: () => ({ name: 'studentList' })
            }
        ]
    },
    {
        path: '*',
        action: () => ({ name: 'notFound' })
    }
]
