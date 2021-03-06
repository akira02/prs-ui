import { types } from 'mobx-state-tree'

/** 使用者 */
export const UserModel = types.model('User', {
    id: types.identifier(types.string),
    name: types.string,
    role: types.union(types.literal('teacher'), types.literal('student'))
})

export type User = typeof UserModel.Type
