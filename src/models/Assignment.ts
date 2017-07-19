import {DateString} from './DateString'
import {Attachment} from './Attachment'

export interface Assignment {
    id: string
    name: string
    data_link: string
    description: string
    created_date: string

    
    assigned: DateString
    due: DateString
    submitted?: DateString

    attachments: Attachment[]

    course: {
        id: string
        name: string
    }
}

