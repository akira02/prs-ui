import {observable, action} from 'mobx'

import {api} from '../../../../api'
import {Auth} from '../../../../stores/Auth'

/**
 * 送出資料後 server 回傳的 json
 * @export
 * @interface Result
 */
export interface Result {
    success: boolean
    id: string
}

/**
 * 用來在元件間分享輸入的資料和送出資料的功能
 * @export
 * @class InputStore
 */
export class InputStore {
    private readonly auth: Auth

    @observable name: string = ''
    @observable description: string = ''
    @observable data_link: string = ''

    @observable result: Result | null = null

    constructor (auth: Auth) {
        this.auth = auth
    }

    @action.bound
    async submit (courseId: string): Promise<Result> {
        const response = await api.post('assignments')
            .auth(this.auth.token)
            .send({
                name: this.name,
                description: this.description,
                data_link: this.data_link,
                course_id: courseId
            })
        return response.body
    }

    @action.bound
    clear () {
        this.name = ''
        this.description = ''
        this.data_link = ''
    }
}