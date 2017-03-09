import { observable, action, computed, autorun } from 'mobx'
import { api } from '../api'

export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable name: string = ''
    @observable password: string = ''

    @observable remember: boolean
    @observable token: string

    @computed get isLoggedIn (): boolean {
        return this.token != null
    }

    constructor () {
        const data = JSON.parse(sessionStorage.getItem(Auth.STORAGE_KEY) ||
            localStorage.getItem(Auth.STORAGE_KEY)) ||
            {remember: false, token: null}

        this.remember = data.remember
        this.token = data.token

        autorun(() => {
            sessionStorage.removeItem(Auth.STORAGE_KEY)
            localStorage.removeItem(Auth.STORAGE_KEY)

            if (this.token != null) {      
                const storage = this.remember ? localStorage : sessionStorage
                storage.setItem(Auth.STORAGE_KEY, JSON.stringify({
                    token: this.token,
                    remember: this.remember
                }))
            }
        })
    }

    @action
    async login (): Promise<void> {
        interface Response {
            success: number,
            token?: string,
            message?: string
        }

        const response = await api.post<Response>('users/login', {
            name: this.name,
            password: this.password
        })

        if (!response.success) throw new Error(response.message)

        this.token = response.token
    }

    @action
    logout () {
        this.token = null
    }
}
