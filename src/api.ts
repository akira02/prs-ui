import qs from 'query-string'
import {auth} from './store/auth'

export interface Options extends RequestInit {
    auth: boolean
}

const defaultOptions: Options = {
    auth: true
}

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com/'

    get<T> (pathname: string, params: object = {}, options: Partial<Options> = {}): Promise<T> {
        const {auth=true, ...rest} = options
        if (auth) {
            params = { ...params, token: this.token }
        }
        return this.request<T>(`${pathname}?${qs.stringify(params)}`, rest)
    }

    post<T> (pathname: string, params: object = {}, options: Partial<Options> = {}): Promise<T> {
        const {auth=true, ...rest} = options
        if (auth) {
            params = { ...params, token: this.token }
        }
        return this.request<T>(pathname, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(params),
            ...rest
        })
    }

    request<T> (path: string, options: RequestInit): Promise<T> {
        return fetch(`${PrsApi.BASE}${path}`, options)
            .then(response => {
                if (response.status >= 400) throw new Error(response.toString())
                return response
            })
            .then<any>(res => res.json())
    }

    get token (): string {
        return auth.token
    }
}

export const api = new PrsApi()
