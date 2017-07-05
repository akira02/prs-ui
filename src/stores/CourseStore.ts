import { observable, computed, action, ObservableMap } from 'mobx'
import { api } from '../api'

import { Auth } from './Auth'
import { AssignmentStore } from './AssignmentStore'

import { Assignment } from '../models/Assignment'
import { Course } from '../models/Course'
import { User } from '../models/User'

export class CourseStore {
    private readonly auth: Auth

    @observable course: Course
    @observable assignmentStores: ObservableMap<AssignmentStore> = new ObservableMap<AssignmentStore>()
    @observable students: User[] = []
    // TODO: add type
    @observable forms: any[] = []

    constructor (auth: Auth, course: Course) {
        this.auth = auth
        this.course = course
    }

    async fetchAssignments () {
        const response = await api.get('assignments')
            .query({ course_id: this.course.id })
            .auth(this.auth.token)
        this.updateAssignments(response.body.assignments)
    }

    @action
    private updateAssignments (assignments: Assignment[]) {
        const newAssignments = new Map(assignments.map<[string, Assignment]>(value => [value.id, value]))

        for (let key of this.assignmentStores.keys()) {
            if (!newAssignments.has(key)) {
                this.assignmentStores.delete(key)
            }
        }

        newAssignments.forEach((assignment, key) => {
            const course = this.assignmentStores.get(key)
            
            if (course != null) {
                course.assignment = assignment
            } else {
                this.assignmentStores.set(key, new AssignmentStore(this.auth, assignment))
            }
        })
    }

    @action
    async fetchStudents () {
        const response = await api.get('users')
            .query({ role: 'student', course_id: this.course.id })
            .auth(this.auth.token)
        this.students = response.body
    }

    @action fetchForms () {
        //TODO: fetch forms from server
    }
}