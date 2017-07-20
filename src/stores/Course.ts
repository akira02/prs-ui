import {types, getEnv, getRoot} from 'mobx-state-tree' 
import {RootStore} from './RootStore'
import {AttachmentModel, Attachment} from './Attachment'
import {AssignmentModel} from './Assignment'
import {UserModel, User} from './User'

export const CourseModel = types.model(
    'Course',
    {
        id: types.identifier(types.string),
        name: types.string,
        semester: types.string,
        teacher: types.model({
            id: types.string,
            name: types.string
        }),

        attachments: types.array(AttachmentModel),

        get forms (): Attachment[] {
            return this.attachments
                .filter(attachment => attachment.type === 'form')
        },

        assignments: types.optional(types.array(AssignmentModel), []),
        students: types.optional(types.array(types.reference(UserModel)), []),
    },
    {
        async fetchAssignments () {
            const {api} = getEnv(this)
            const {auth} = getRoot<RootStore>(this)

            const response = await api.get('assignments')
                .query({ course_id: this.id })
                .auth(auth.token)
            this.updateAssignments(response.body.assignments)
        },
        updateAssignments (assignments: any[]) {
            this.assignments.replace(assignments)
        },
        async fetchStudents () {
            const {api} = getEnv(this)
            const {userStore} = getRoot<RootStore>(this)

            const studentIds = await userStore.fetch({ role: 'student', course_id: this.id })
            this.updateStudents(studentIds)
        },
        updateStudents (students: any[]) {
            this.students.replace(students)
        }
    }
)

export type Course = typeof CourseModel.Type

