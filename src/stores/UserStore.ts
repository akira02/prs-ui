import { types, getEnv, getRoot } from 'mobx-state-tree'
import { RootStore } from './RootStore'
import { User, UserModel } from './User'

/** 儲存所有 User */
export const UserStoreModel = types.model(
    'UserStore',
    {
        users: types.optional(types.map(UserModel), {})
    },
    {
        /**
         * 從伺服器更新使用者列表
         * @param filter 傳給 api 的 filter
         * @returns 這次下載到的使用者的 id 列表
         */
        async fetch(filter?: object): Promise<User['id'][]> {
            const { api } = getEnv(this)
            const { auth } = getRoot<RootStore>(this)

            const response = await api
                .get('users')
                .auth(auth.token)
                .query(filter)

            const users = response.body

            if (filter == null) {
                this.updateUsers(users)
            } else {
                this.addUsers(users)
            }

            return users.map(user => user.id)
        },
        /** 更新使用者列表 (會刪除表中沒有的) */
        updateUsers(users: any[]) {
            this.users.replace(users)
        },
        /** 將 array 中的使用者加入使用者列表 (不刪除表中沒有的) */
        addUsers(users: any[]) {
            users.map(user => this.users.put(user))
        }
    }
)

export type UserStore = typeof UserStoreModel.Type
