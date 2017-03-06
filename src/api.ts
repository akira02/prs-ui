import qs from 'query-string'
import {auth} from './store/auth'

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com'

    get (pathname: string, params: object): any {
        return fetch(`${PrsApi.BASE}${pathname}?${qs.stringify(params)}`)
            .then(res => res.json())
            .then((data: any) => {
                if (!data.success) throw new Error(data.message)
                return data
            })
    }

    post (pathname: string, params: object): any {
        return fetch(`${PrsApi.BASE}${pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(params)
        })
            .then(res => res.json())
            .then((data: any) => {
                if (!data.success) throw new Error(data.message)
                return data
            })
    }

    get token (): string {
        return auth.token
    }
}

export const api = new PrsApi()
