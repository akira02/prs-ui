import {serializable} from 'serializr'
import {isoDate} from './helpers'

export class Submission {
    @serializable    
    id: string

    @serializable
    assignment_id: string

    @serializable(isoDate)
    submitted: Date

    @serializable
    username: string

    @serializable
    link: string

    @serializable
    description: string
}