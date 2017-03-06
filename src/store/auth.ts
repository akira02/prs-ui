import { observable, action, computed } from 'mobx'
import qs from 'query-string'
import { history } from './history'

export type AuthState = 'teacher' | 'student' | 'none'

export class Auth {
    private static STORAGE_KEY: string = 'auth'

    @observable state: AuthState = 'none'

    @observable remember: boolean = false

    @observable nextPage: string = qs.parse(history.location.search).nextPage || '/'

    @action
    login (formData: FormData) {
        setTimeout(() => {
            this.updateToken('student', 'GOOD_TOKEN')
        }, 500)
    }

    @action
    private updateToken (state, token) {
        this.state = state
        this.token = token
        this.gotoNextPage()
    }

    @computed
    get token (): string {
        return this.storage.getItem(Auth.STORAGE_KEY)
    }

    set token (value: string) {
        this.storage.setItem(Auth.STORAGE_KEY, value)
    }

    @computed
    private get storage () {
        return this.remember ? localStorage : sessionStorage
    }

    gotoNextPage () {
        window.location.href = this.nextPage
    }
}