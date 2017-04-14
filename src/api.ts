import {stringify} from 'query-string'

import {Assignment} from './models/Assignment'
import {Course} from './models/Course'
import {Submission} from './models/Submission'
import {User} from './models/User'

import * as superagent from 'superagent'

export const api = {
    get (pathname: string) {
        const request = superagent.get(API_BASE + pathname)

        request.auth = function (token: string) {
            this.set('Authorization', token)
            return this
        }

        return request
    },
    post (pathname: string) {
        const request = superagent.post(API_BASE + pathname)

        request.auth = function (token: string) {
            this.set('Authorization', token)
            return this
        }

        request.type('form')

        return request
    }
}
