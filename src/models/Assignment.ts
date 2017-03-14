import {serializable, createSimpleSchema, object} from 'serializr'
import {isoDate} from './helpers'

const lesson = createSimpleSchema({ id: true, name: true })

export class Assignment {
    @serializable
    id: string

    @serializable(isoDate)
    assigned: Date

    @serializable(isoDate)
    due: Date

    @serializable(isoDate)
    submitted?: Date

    @serializable(object(lesson))
    lesson: {
        id: string
        name: string
    }
}

