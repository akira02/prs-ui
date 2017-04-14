import {DateString} from './DateString'

export interface Assignment {
    id: string
    name: string
    data_link: string
    description: string
    created_date: string

    
    assigned: DateString
    due: DateString
    submitted?: DateString

    course: {
        id: string
        name: string
    }
}

