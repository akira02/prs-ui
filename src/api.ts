import {observable} from 'mobx'
import {stringify} from 'query-string'
import {deserialize, ClazzOrModelSchema} from 'serializr'

import {Assignment} from './models/Assignment'
import {Lesson} from './models/Lesson'
import {Submission} from './models/Submission'

export class StatusCodeError extends Error {
    constructor (
            public readonly status: number,
            message?: string) {
        super(message)
    }
}

export interface ApiRequest<T> {
    readonly method: 'GET' | 'POST'
    readonly pathname: string
    readonly headers: Headers
    readonly data?: object
    readonly deserializer: (value: any) => T
}

export class Builder<T> {
    constructor (public readonly request: ApiRequest<T>) {
    }
    auth (token: string): Builder<T> {
        const headers = new Headers(this.request.headers)
        headers.set('Authorization', token)
        return new Builder({...this.request, headers})
    }
    params (data?: object): Builder<T> {
        return new Builder({...this.request, data: {...this.request.data, ...data}})
    }
    build (): Request {
        const options: RequestInit = {
            method: this.request.method,
            headers: this.request.headers
        }
        let url = API_BASE + this.request.pathname
        if (this.request.data != null) {
            switch (options.method) {
                case 'GET':
                    url += '?' + stringify(this.request.data)
                    break
                case 'POST':
                    options.headers = new Headers(options.headers)
                    options.headers.set('Content-Type', 'application/x-www-form-urlencoded')
                    options.body = stringify(this.request.data)
                    break
            }
        }
        return new Request(url, options)
    }
    fetch (): Promise<T> {
        return fetch(this.build())
            .then(response => {
                if (response.status >= 400) {
                    throw new StatusCodeError(response.status)
                }
                return response
            })
            .then<any>(res => res.json())
            .then<T>(json => this.request.deserializer(json))
    }
}
function get<T extends any[]> (pathname: string, schema?: ClazzOrModelSchema<T[0]>): Builder<T>
function get<T> (pathname: string, schema?: ClazzOrModelSchema<T>): Builder<T>
function get (pathname: string, schema?: ClazzOrModelSchema<any>): Builder<any> {
    return new Builder({
        method: 'GET',
        pathname,
        headers: new Headers(),
        data: null,
        deserializer: schema != null
            ? value => deserialize<any>(schema, value)
            : value => value
    })
}

function post<T extends any[]> (pathname: string, schema?: ClazzOrModelSchema<T[0]>): Builder<T>
function post<T> (pathname: string, schema?: ClazzOrModelSchema<T>): Builder<T>
function post (pathname: string, schema?: ClazzOrModelSchema<any>): Builder<any> {
    return new Builder({
        method: 'POST',
        pathname,
        headers: new Headers(),
        data: null,
        deserializer: schema != null
            ? value => deserialize<any>(schema, value)
            : value => value
    })
}

export const tokens = {
    post: post<{token: string}>('tokens')
}
export const lessons = {
    get:　get<Lesson[]>('lessons', Lesson)
}
export const assignments = {
    get: get<Assignment[]>('assignments', Assignment)
}
export const submissions = {
    post: post<{success: boolean}>('submissions')
}
export const responses = {
    get: get<Submission[]>('responses', Submission)
}
export const reply = {
    post: post<{success: boolean}>('reply')
}