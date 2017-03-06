import { observable, action, computed } from 'mobx'
import qs from 'query-string'
import { history } from './history'

export type AuthState = 'teacher' | 'student' | 'none'

export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable state: AuthState = 'none'

    @observable remember: boolean = false

    @action
    login (formData: FormData) {
        setTimeout(() => {
            this.updateToken('student', 'GOOD_TOKEN')
            this.gotoNextPage()
        }, 500)
    }

    @action
    private updateToken (state, token) {
        this.state = state
        this.token = token
    }

    get token (): string | null {
        return sessionStorage.getItem(Auth.STORAGE_KEY) || localStorage.getItem(Auth.STORAGE_KEY)
    }

    set token (value: string | null) {
        sessionStorage.removeItem(Auth.STORAGE_KEY)
        localStorage.removeItem(Auth.STORAGE_KEY)

        if (value != null) {      
            const storage = this.remember ? localStorage : sessionStorage
            storage.setItem(Auth.STORAGE_KEY, value)
        }
    }

    gotoNextPage () {
        const {goBack=false, nextPage='/'} = history.location.state
        if (goBack) {
            history.goBack()
        } else {
            history.replace(nextPage)
        }
    }
}