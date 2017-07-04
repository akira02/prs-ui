import * as superagent from 'superagent'

interface ApiRequest extends superagent.SuperAgentRequest {
    auth (user: string, name: string): this
    auth (token: string | null): this
}

/**
 * api client for the PRS api
 */
export const api = {
    /**
     * Wrapper for superagent.get
     * @param pathname
     * @returns A superagent Request object with custom auth method
     */
    get (pathname: string): ApiRequest {
        const request = superagent.get(API_BASE + pathname) as ApiRequest

        request.auth = function (token: string | null) {
            if (token != null) {
                this.set('Authorization', token)
            }
            return this
        }

        return request
    },
    /**
     * Wrapper for superagent.post
     * Sets request type to 'form'
     * @param pathname path to get
     * @returns A superagent Request object with custom auth method
     */
    post (pathname: string) {
        const request = superagent.post(API_BASE + pathname) as ApiRequest

        request.auth = function (token: string | null) {
            if (token != null) {
                this.set('Authorization', token)
            }
            return this
        }

        request.type('form')

        return request
    }
}
