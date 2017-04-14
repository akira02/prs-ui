import {DateString} from './DateString'

export interface Submission {
    id: string
    assignment_id: string
    submitted: DateString
    username: string
    link: string
    description: string
}