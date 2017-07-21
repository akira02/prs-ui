import { types, getEnv, getRoot } from 'mobx-state-tree'
import { RootStore } from './RootStore'
import { User, UserModel } from './User'

export const UserStoreModel = types.model(
    'UserStore',
    {
        users: types.optional(types.map(UserModel), {})
    },
    {
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
        updateUsers(users: any[]) {
            this.users.replace(users)
        },
        addUsers(users: any[]) {
            users.map(user => this.users.put(user))
        }
    }
)

export type UserStore = typeof UserStoreModel.Type
