import { types } from 'mobx-state-tree'

/** 作業/課程的附件 */
export const AttachmentModel = types.model('Attachment', {
    type: types.union(types.literal('form'), types.literal('image')),
    name: types.string,
    content: types.string
})

export type Attachment = typeof AttachmentModel.Type
