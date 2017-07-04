import * as page from 'page'

import {Stores} from './stores'

import * as PageData from './stores/ui/PageData'

export function startRouter (stores: Stores) {
    const {auth, history, viewStore, courseMap, message} = stores

    // Plugins

    /**
     * Shows message stored inside location.state
     */
    function showMessage (ctx, next) {
        if (ctx.state.message != null) {
            message.show(history.location.state)
        }
        next()
    }

    /**
     * Redirect to '/login' if not logged in
     */
    function login (ctx, next) {
        if (auth.isLoggedIn) {
            next()
        } else {
            history.push('/login', {
                message: 'Please Login First!',
                goBack: true
            })
        }
    }

    /**
     * Fetch courseList and set selected course
     * If no such course, redirect to '/courses'
     */
    async function coursePage (ctx, next) {
        viewStore.page = {
            name: 'course',
            subPage: null,
            selectedCourse: null
        }

        await courseMap.fetch()
        viewStore.page.selectedCourse = courseMap.courseStores.get(ctx.params.courseId)

        if (viewStore.page.selectedCourse != null) {
            next()
        } else {
            history.replace('/courses', {
                message: 'Course Not Found!'
            })
        }
    }

    // Routes
    page('*', showMessage)
    
    page('/', () => history.replace('/courses'))
    page('/login', () => viewStore.page = { name: 'login' })

    page('/courses', login, () => {
        viewStore.page = { name: 'courseList' }
        courseMap.fetch()
    })

    page('/courses/:courseId', login, (ctx) => {
        history.replace(`/courses/${ctx.params.courseId}/assignments`)
    })

    page('/courses/:courseId/assignments', login, coursePage, () => {
        const page = viewStore.page as PageData.Course
        page.subPage = { name: 'assignments' }
        page.selectedCourse.fetchAssignments()
    })

    page('/courses/:courseId/forms', login, coursePage, () => {
        // TODO: prepare for FormsPage
    })

    page('/courses/:courseId/students', login, coursePage, () => {
        const page = viewStore.page as PageData.Course
        page.subPage = { name: 'assignments' }
        page.selectedCourse.fetchStudents()
    })

    page('*', () => viewStore.page = { name: 'notFound' })

    page.start({
        click: false
    })
}
