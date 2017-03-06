import qs from 'query-string'
import {auth} from './store/auth'

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com'

    get (pathname: string, params: object) {
        return fetch(`${PrsApi.BASE}${pathname}?${qs.stringify(params)}`)
    }

    post (pathname: string, params: object, body: FormData) {
        return fetch(`${PrsApi.BASE}${pathname}?${qs.stringify(params)}`, {
            method: 'POST',
            body
        })
    }

    get token (): string {
        return auth.token
    }
}

export const api = new PrsApi()
