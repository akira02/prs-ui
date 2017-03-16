import {observable} from 'mobx'
import {serializable, createSimpleSchema, object} from 'serializr'

const teacher = createSimpleSchema({ id: true, name: true })

export class Course {
    @serializable
    @observable id: string

    @serializable
    @observable name: string

    @serializable
    @observable semester: string

    @serializable(object(teacher))
    @observable teacher: {
        id: string
        name: string
    }
}
