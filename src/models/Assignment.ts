import {serializable, createSimpleSchema, object} from 'serializr'
import {isoDate} from './helpers'

const course = createSimpleSchema({ id: true, name: true })

export class Assignment {
    @serializable
    id: string

    @serializable(isoDate)
    assigned: Date

    @serializable(isoDate)
    due: Date

    @serializable(isoDate)
    submitted?: Date

    @serializable(object(course))
    course: {
        id: string
        name: string
    }
}

