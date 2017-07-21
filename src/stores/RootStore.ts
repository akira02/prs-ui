import { types } from 'mobx-state-tree'

import { AuthModel } from './Auth'
import { HistoryModel } from './History'
import { CourseStoreModel } from './CourseStore'
import { UserStoreModel } from './UserStore'
import { MessageModel } from './ui/Message'
import { ViewStoreModel } from './ui/ViewStore'

export const RootStoreModel = types.model('Stores', {
    auth: types.optional(AuthModel, {}),
    history: types.optional(HistoryModel, {}),
    courseStore: types.optional(CourseStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    viewStore: types.optional(ViewStoreModel, {}),
    message: types.optional(MessageModel, {})
})

export type RootStore = typeof RootStoreModel.Type
