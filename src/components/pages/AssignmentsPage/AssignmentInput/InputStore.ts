import {observable, action} from 'mobx'

import {Auth} from '../../../../stores/Auth'

import {Api} from '../../../../api'

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
    private readonly api: Api
    private readonly auth: Auth

    @observable name: string = ''
    @observable description: string = ''
    @observable data_link: string = ''

    constructor (api: Api, auth: Auth) {
        this.api = api
        this.auth = auth
    }

    /**
     * 送出表單
     * @param {string} courseId 
     * @returns {Promise<Result>} 
     * @memberof InputStore
     */
    @action.bound
    async submit (courseId: string): Promise<Result> {
        const response = await this.api.post('assignments')
            .auth(this.auth.token)
            .send({
                name: this.name,
                description: this.description,
                data_link: this.data_link,
                course_id: courseId
            })
        return response.body
    }

    /**
     * 重設表單
     * @memberof InputStore
     */
    @action.bound
    clear () {
        this.name = ''
        this.description = ''
        this.data_link = ''
    }
}