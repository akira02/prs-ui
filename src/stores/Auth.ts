import { observable, action, computed, reaction } from 'mobx'
import { api, Plugin, Request } from '../api'

export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable username: string = ''
    @observable password: string = ''

    @observable remember: boolean = false
    @observable token: string = null

    @computed get isLoggedIn (): boolean {
        return this.token != null
    }

    constructor () {
        this.hydrate()

        reaction(
            () => ({
                storage: this.remember ? localStorage : sessionStorage,
                data: {
                    token: this.token,
                    remember: this.remember
                }
            }),
            this.store)
    }
    @action
    private hydrate () {
        const json = sessionStorage.getItem(Auth.STORAGE_KEY) || localStorage.getItem(Auth.STORAGE_KEY)

        if (json == null) return

        const {remember, token} = JSON.parse(json)

        this.remember = remember
        this.token = token
    }
    @action.bound
    private store ({storage, data}: {storage: Storage, data: any}) {
        storage.setItem(Auth.STORAGE_KEY, JSON.stringify(data))
    }
    @action
    async login (): Promise<void> {
        interface Response {
            token: string
        }

        const response = await api.post<Response>('tokens', {
            username: this.username,
            password: this.password
        })

        this.token = response.token
    }
    @action
    logout () {
        this.token = null
    }
    @computed
    plugin: Plugin = ({path, options}: Request) => {
        const {headers, ...rest} = options
        return {
            path,
            options: {
                headers: {
                    Authorization: this.token,
                    ...headers
                },
                ...rest
            }
        }
   }
}
