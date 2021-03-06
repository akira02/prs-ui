import { types } from 'mobx-state-tree'

import { AuthModel } from './Auth'
import { HistoryModel } from './History'
import { CourseStoreModel } from './CourseStore'
import { UserStoreModel } from './UserStore'
import { MessageModel } from './ui/Message'
import { ViewStoreModel } from './ui/ViewStore'

/**
 * 所有 store 的 root
 * 在 store 中可以用 getRoot(this) 獲得
 */
export const RootStoreModel = types.model('RootStore', {
    auth: types.optional(AuthModel, {}),
    history: types.optional(HistoryModel, {}),
    courseStore: types.optional(CourseStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    viewStore: types.optional(ViewStoreModel, {}),
    message: types.optional(MessageModel, {})
})

export type RootStore = typeof RootStoreModel.Type
