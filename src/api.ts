import {observable} from 'mobx'
import qs from 'query-string'

export class StatusCodeError extends Error {
    constructor (
            public readonly status: number,
            message?: string) {
        super(message)
    }
}

export const API_BASE: string = 'http://prs-node.herokuapp.com/'

export interface ApiRequest {
    readonly method: 'GET' | 'POST'
    readonly pathname: string
    readonly headers: Headers
    readonly data: object
}

export class Builder {
    constructor (public readonly request: ApiRequest) {
    }
    get (data?: object): Builder {
        return new Builder({...this.request, method: 'GET'}).params(data)
    }
    post (data?: object): Builder {
        return new Builder({...this.request, method: 'POST'}).params(data)
    }
    path (pathname: string): Builder {
        return new Builder({...this.request, pathname})
    }
    auth (token: string): Builder {
        const headers = new Headers(this.request.headers)
        headers.set('Authorization', token)
        return new Builder({...this.request, headers})
    }
    params (data?: object): Builder {
        return new Builder({...this.request, data: {...this.request.data, ...data}})
    }
    build (): Request {
        const options: RequestInit = {
            method: this.request.method,
            headers: this.request.headers
        }
        let url = API_BASE + this.request.pathname
        switch (options.method) {
            case 'GET':
                url += '?' + qs.stringify(this.request.data)
                break
            case 'POST':
                options.headers = new Headers(options.headers)
                options.headers.set('Content-Type', 'application/x-www-form-urlencoded')
                options.body = qs.stringify(this.request.data)
                break
        }
        return new Request(url, options)
    }
    fetch<T> (): Promise<T> {
        return fetch(this.build())
            .then(response => {
                if (response.status >= 400) {
                    throw new StatusCodeError(response.status)
                }
                return response
            })
            .then<any>(res => res.json())
    }
}

function endpoint (pathname: string) {
    return new Builder({
        method: 'GET',
        pathname,
        headers: new Headers(),
        data: {}
    })
}

export const tokens = endpoint('tokens')
export const lessons = endpoint('lessons')
export const assignments = endpoint('assignments')
export const submissions = endpoint('submissions')
export const responses = endpoint('responses')
export const reply = endpoint('reply')