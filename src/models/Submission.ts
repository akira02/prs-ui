import {observable} from 'mobx'
import {serializable} from 'serializr'
import {isoDate} from './helpers'

export class Submission {
    @serializable    
    @observable id: string

    @serializable
    @observable assignment_id: string

    @serializable(isoDate)
    @observable submitted: Date

    @serializable
    @observable username: string

    @serializable
    @observable link: string

    @serializable
    @observable description: string
}