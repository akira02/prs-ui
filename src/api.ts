import qs from 'query-string'

export class PrsApi {
    static readonly BASE = 'http://prs-node.herokuapp.com/'

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

    request<T> (path: string, options: RequestInit): Promise<T> {
        return fetch(`${PrsApi.BASE}${path}`, options)
            .then(response => {
                if (response.status >= 400) throw new Error(response.toString())
                return response
            })
            .then<any>(res => res.json())
    }
}

export const api = new PrsApi()
