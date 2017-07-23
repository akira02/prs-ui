import { observable, action } from 'mobx'

import { Auth } from '../../../../stores/Auth'

import { Api } from '../../../../api'

/** 送出資料後 server 回傳的 json */
export interface Result {
    success: boolean
    id: string
}

/** 負責處理新增 Assignment 的表單 */
export class InputStore {
    private readonly api: Api
    private readonly auth: Auth

    @observable name: string = ''
    @observable description: string = ''
    @observable data_link: string = ''

    constructor(api: Api, auth: Auth) {
        this.api = api
        this.auth = auth
    }

    /**
     * 送出表單
     * @param courseId  要新增 assignment 的 course
     * @returns         api 回傳的結果
     */
    @action.bound
    async submit(courseId: string): Promise<Result> {
        const response = await this.api
            .post('assignments')
            .auth(this.auth.token)
            .send({
                name: this.name,
                description: this.description,
                data_link: this.data_link,
                course_id: courseId
            })
        return response.body
    }

    /** 重設表單 */
    @action.bound
    clear() {
        this.name = ''
        this.description = ''
        this.data_link = ''
    }
}
