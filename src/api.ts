import qs from 'query-string'
import {auth} from './store/auth'

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com'

    get (pathname, params) {
        return fetch(`${PrsApi.BASE}${pathname}?${qs.stringify(params)}`)
    }

    post (pathname, params, body) {
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
