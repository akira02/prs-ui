import { observable, computed, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Course } from '../models/Course'

import { Auth } from './Auth'
import { CourseStore } from './CourseStore'

/**
 * 儲存所有從 api 抓來的資料
 * @export
 * @class CourseMap
 */
export class CourseMap {
    private readonly auth: Auth

    /**
     * 一個 key 是 id, value 是 CourseStore 的 Map
     * 儲存 course 列表
     * 用起來和 es6 的 Map 基本上一樣
     * https://mobx.js.org/refguide/map.html
     * @type {ObservableMap<CourseStore>}
     * @memberof CourseMap
     */
    @observable courseStores: ObservableMap<CourseStore> = new ObservableMap<CourseStore>()

    /**
     * 檢查是否有 id 為此值的 course
     * @param {string} id 
     * @returns {boolean} 
     * @memberof CourseMap
     */
    has (id: string): boolean {
        return this.courseStores.has(id)
    }

    constructor (auth: Auth) {
        this.auth = auth
    }

    /**
     * 從 api 抓取 course 列表並更新
     * @memberof CourseMap
     */
    async fetch () {
        const response = await api.get('courses')
            .auth(this.auth.token)
        this.updateCourses(response.body.courses)
    }

    /**
     * 用來更新 course 列表的 action
     * @private
     * @param {Course[]} courses 新的 course 列表
     * @memberof CourseMap
     */
    @action
    private updateCourses (courses: Course[]) {
        const newCourses = new Map(courses.map<[string, Course]>(value => [value.id, value]))
        
        // 刪除新列表裡沒有, 但本地有的 course
        for (let key of this.courseStores.keys()) {
            if (!newCourses.has(key)) {
                this.courseStores.delete(key)
            }
        }

        newCourses.forEach((course, key) => {
            const courseStore = this.courseStores.get(key)
            
            if (courseStore != null) {
                // 如果已經存在同 id 的 CourseStore, 則直接更新他的資料
                courseStore.course = course
            } else {
                // 如果沒有同 id 的 CourseStore, 創造一個新的並加到 courseStores 裡
                this.courseStores.set(key, new CourseStore(this.auth, course))
            }
        })
    }
}
