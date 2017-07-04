import { observable, action, computed, reaction } from 'mobx'
import { api } from '../api'

/**
 * Store for api token and login form
 */
export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable remember: boolean = false
    @observable token: string | null = null

    @computed get isLoggedIn (): boolean {
        return this.token != null
    }

    constructor () {
        this.hydrate()

        reaction(() => ({
            storage: this.remember ? localStorage : sessionStorage,
            data: {
                token: this.token,
                remember: this.remember
            }
        }), this.store)
    }
    /**
     * Save data to the browser
     */
    @action.bound
    private store ({storage, data}: {storage: Storage, data: any}) {
        storage.setItem(Auth.STORAGE_KEY, JSON.stringify(data))
    }
    /**
     * Load saved data from the browser
     */
    @action
    private hydrate () {
        const json = sessionStorage.getItem(Auth.STORAGE_KEY) || localStorage.getItem(Auth.STORAGE_KEY)

        if (json == null) return

        const {remember, token} = JSON.parse(json)
        this.remember = remember
        this.token = token
    }

    @action.bound
    async login (name: string, password: string): Promise<void> {
        const response = await api.post('users/login')
            .send({ name, password })

        this.token = response.body.token
    }
    @action.bound
    logout () {
        this.token = null
    }
}
