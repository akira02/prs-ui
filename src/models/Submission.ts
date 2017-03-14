import {serializable} from 'serializr'
import {isoDate} from './iso-date'

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