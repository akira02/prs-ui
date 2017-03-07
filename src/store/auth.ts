import { observable, action, computed, autorun } from 'mobx'
import qs from 'query-string'
import { api } from '../api'
import { history } from './history'


export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable name: string = ''
    @observable password: string = ''

    @observable remember: boolean = false

    @observable token: string =
        sessionStorage.getItem(Auth.STORAGE_KEY) ||
        localStorage.getItem(Auth.STORAGE_KEY)

    constructor () {
        autorun(() => {
            sessionStorage.removeItem(Auth.STORAGE_KEY)
            localStorage.removeItem(Auth.STORAGE_KEY)

            if (this.token != null) {      
                const storage = this.remember ? localStorage : sessionStorage
                storage.setItem(Auth.STORAGE_KEY, this.token)
            }
        })
    }

    @action
    async login () {
        const {token} = await api.post<{ token: string }>('users/login', {
            name: this.name,
            password: this.password
        }, { auth: false })

        this.token = token
        this.gotoNextPage()
    }

    gotoNextPage () {
        const {goBack=false, nextPage='/'} = history.location.state || {}
        if (goBack) {
            history.goBack()
        } else {
            history.replace(nextPage)
        }
    }
}

export const auth = new Auth()