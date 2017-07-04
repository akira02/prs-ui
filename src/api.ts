import * as superagent from 'superagent'

function coolIdHack (req: superagent.SuperAgentRequest) {
    function visit (value: any) {
        if (typeof value === 'object') {
            for (let key in value) {
                visit(value[key])
            }
            if ('_id' in value) {
                value.id = value['_id']
            }
        }
        if (Array.isArray(value)) {
            value.forEach(visit)
        }
    }
    req.parse['application/json'] = (str) => {
        const data = JSON.parse(str)
        visit(data)
        return data
    }
}

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

        request.use(coolIdHack)

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
        
        request.use(coolIdHack)

        return request
    }
}
