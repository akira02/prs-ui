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

function get (pathname: string): Builder {
    return new Builder({
        method: 'GET',
        pathname,
        headers: new Headers(),
        data: {}
    })
}

function post (pathname: string): Builder {
    return new Builder({
        method: 'POST',
        pathname,
        headers: new Headers(),
        data: {}
    })
}

export const tokens = {
    post: post('tokens')
}
export const lessons = {
    get:　get('lessons')
}
export const assignments = {
    get: get('assignments')
}
export const submissions = {
    post: post('submissions')
}
export const responses = {
    get: get('responses')
}
export const reply = {
    post: post('reply')
}