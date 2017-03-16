import {observable} from 'mobx'
import {serializable, createSimpleSchema, object} from 'serializr'
import {isoDate} from './helpers'

const course = createSimpleSchema({ id: true, name: true })

export class Assignment {
    @serializable
    @observable id: string

    @serializable(isoDate)
    @observable assigned: Date

    @serializable(isoDate)
    @observable due: Date

    @serializable(isoDate)
    @observable submitted?: Date

    @serializable(object(course))
    @observable course: {
        id: string
        name: string
    }
}

