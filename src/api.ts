import {observable} from 'mobx'
import qs from 'query-string'

export class StatusCodeError extends Error {
    constructor (
            public readonly status: number,
            message?: string) {
        super(message)
    }
}

export interface Request {
    path: string,
    options: RequestInit
}

export type Plugin = (request: Request) => Request

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com/'

    private readonly plugin?: Plugin

    constructor (plugin: Plugin = null) {
        this.plugin = plugin
    }

    get<T> (pathname: string, params: object = {}, options: RequestInit = {}): Promise<T> {
        return this.request<T>(`${pathname}?${qs.stringify(params)}`, options)
    }

    post<T> (pathname: string, params: object = {}, options: RequestInit = {}): Promise<T> {
        const {headers=null, ...rest} = options
        return this.request<T>(pathname, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers
            },
            body: qs.stringify(params),
            ...rest
        })
    }

    use (plugin: Plugin): PrsApi {
        return (this.plugin == null)
            ? new PrsApi(plugin)
            : new PrsApi(request => plugin(this.plugin(request)))
    }

    request<T> (path: string, options: RequestInit): Promise<T> {
        if (this.plugin != null) {
            ({path, options} = this.plugin({path, options}))
        }
        return fetch(`${PrsApi.BASE}${path}`, options)
            .then(response => {
                if (response.status >= 400) {
                    throw new StatusCodeError(response.status)
                }
                return response
            })
            .then<any>(res => res.json())
    }
}

export const api = new PrsApi()
