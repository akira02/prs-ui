import {types, getEnv, addDisposer} from 'mobx-state-tree'
import {reaction} from 'mobx'

const STORAGE_KEY: string = 'auth'

export const AuthModel = types.model(
    'Auth',
    {
        remember: false,
        token: types.maybe(types.string),
        get isLoggedIn () {
            return this.token != null
        }
    },
    {
        async login (name: string, password: string) {
            const {api} = getEnv(this)
            const response = await api.post('users/login')
                .send({ name, password })

            this.updateToken(response.body.token)
        },
        updateToken (token) {
            this.token = token
        },
        logout () {
            this.token = null
        },
        afterAttach () {
            this.readFromStorage()
            
            addDisposer(this, reaction(() => ({
                storage: this.remember ? localStorage : sessionStorage,
                data: { token: this.token, remember: this.remember }
            }), this.saveToStorage))
        },
        readFromStorage () {
            const json = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY)
            if (json == null) return
            const {remember, token} = JSON.parse(json)
            this.remember = remember
            this.token = token
        },
        saveToStorage ({storage, data}) {
            storage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
    }
)

export type Auth = typeof AuthModel.Type