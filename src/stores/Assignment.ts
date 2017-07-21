import { types, getEnv, getRoot } from 'mobx-state-tree'
import { RootStore } from './RootStore'
import { SubmissionModel, Submission } from './Submission'
import { AttachmentModel, Attachment } from './Attachment'

import { updateMap } from './update-map'

export const AssignmentModel = types.model(
    'Assignment',
    {
        id: types.identifier(types.string),
        name: types.string,
        description: types.string,

        assigned: types.string,
        due: types.string,
        submitted: types.maybe(types.string),

        attachments: types.array(AttachmentModel),

        get forms(): Attachment[] {
            return this.attachments.filter(
                attachment => attachment.type === 'form'
            )
        },

        course: types.model({
            id: types.string,
            name: types.string
        }),

        submissions: types.optional(types.map(SubmissionModel), {})
    },
    {
        async fetchSubmissions() {
            const { api } = getEnv(this)
            const { auth } = getRoot<RootStore>(this)

            const response = await api
                .get('submissions')
                .query({ assignment_id: this.id })
                .auth(auth.token)

            this.updateSubmissions(response.body.submissions)
        },
        updateSubmissions(submissions: any[]) {
            updateMap(this.submissions, submissions)
        }
    }
)

export type Assignment = typeof AssignmentModel.Type
