import qs from 'query-string'
import {auth} from './store/auth'

export interface Options extends RequestInit {
    auth: boolean
}

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com/'

    get<T> (pathname: string, params: object = {}, { auth=true, ...options }: Partial<Options> = {}): Promise<T> {
        if (auth) {
            params = { ...params, token: this.token }
        }
        return this.request<T>(`${pathname}?${qs.stringify(params)}`, options)
    }

    post<T> (pathname: string, params: object = {}, { auth=true, ...options }: Partial<Options> = {}): Promise<T> {
        if (auth) {
            params = { ...params, token: this.token }
        }
        return this.request<T>(pathname, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(params),
            ...options
        })
    }

    request<T> (path: string, options: RequestInit): Promise<T> {
        return fetch(`${PrsApi.BASE}${path}`, options)
            .then<any>(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.message)
                return data
            })
    }

    get token (): string {
        return auth.token
    }
}

export const api = new PrsApi()
