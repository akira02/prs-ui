import { observable, computed, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Course } from '../models/Course'

import { Auth } from './Auth'
import { CourseStore } from './CourseStore'

export class CourseMap {
    private readonly auth: Auth

    @observable courseStores: ObservableMap<CourseStore> = new ObservableMap<CourseStore>()

    has (id: string): boolean {
        return this.courseStores.has(id)
    }

    constructor (auth: Auth) {
        this.auth = auth
    }

    async fetch () {
        const response = await api.get('courses')
            .auth(this.auth.token)
        this.updateCourses(response.body.courses)
    }

    @action
    private updateCourses (courses: Course[]) {
        const newCourses = new Map(courses.map<[string, Course]>(value => [value.id, value]))

        for (let key of this.courseStores.keys()) {
            if (!newCourses.has(key)) {
                this.courseStores.delete(key)
            }
        }

        newCourses.forEach((course, key) => {
            const courseStore = this.courseStores.get(key)

            if (courseStore != null) {
                courseStore.course = course
            } else {
                this.courseStores.set(key, new CourseStore(this.auth, course))
            }
        })
    }
}
