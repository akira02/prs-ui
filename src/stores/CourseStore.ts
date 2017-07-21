import {types, getEnv, getRoot} from 'mobx-state-tree'
import {RootStore} from './RootStore'
import {CourseModel} from './Course'

import {updateMap} from './update-map'

/**
 * 儲存所有 Course
 */
export const CourseStoreModel = types.model(
    'CourseStore',
    {
        courses: types.optional(types.map(CourseModel), {})
    },
    {
        async fetch () {
            const {api} = getEnv(this)
            const {auth} = getRoot<RootStore>(this)

            const response = await api.get('courses')
                .auth(auth.token)
            this.updateCourses(response.body.courses)
        },
        updateCourses (courses: any[]) {
            updateMap(this.courses, courses)
        }
    }
)

export type CourseStore = typeof CourseStoreModel.Type