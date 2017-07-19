import * as superagent from 'superagent'

/**
 * 酷炫 superagent plugin
 * 把 json 裡每個 `_id` 弄到 `id`
 * 因為 server 回傳的 json 裡目前只有 _id 沒有 id 所以需要這個
 * @param {superagent.SuperAgentRequest} req 
 */
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
    req.parse((response) => {
        const data = JSON.parse(response.text)
        visit(data)
        return data
    })
}

/**
 * 修改過的 superagent Request
 * @interface ApiRequest
 * @extends {superagent.SuperAgentRequest}
 */
interface ApiRequest extends superagent.SuperAgentRequest {
    /**
     * 自訂的 auth 方法, 把 token 加到 Header 裡
     * @param {(string | null)} token 
     * @returns {this} 
     * @memberof ApiRequest
     */
    auth (token: string | null): this

    /**
     * superagent 原本的 auth 方法
     * 因為刪掉的話 typescript 會報錯, 所以要留著
     * 實際上不支援這樣呼叫
     * @returns {this} 
     * @memberof ApiRequest
     */
    auth (user: string, name: string): this
}

/**
 * PRS api 的 client
 */
export const api = {
    /**
     * 修改過的 superagent.get
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
     * 修改過的 superagent.post
     * @param pathname
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
