import { types } from 'mobx-state-tree'

/** 繳交 */
export const SubmissionModel = types.model('Submission', {
    id: types.identifier(types.string),
    assignment_id: types.string,
    submitted: types.string,
    username: types.string,
    link: types.string,
    description: types.string
})

export type Submission = typeof SubmissionModel.Type
