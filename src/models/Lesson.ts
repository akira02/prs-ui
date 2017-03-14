import {serializable, createSimpleSchema, object} from 'serializr'

const teacher = createSimpleSchema({ id: true, name: true })

export class Lesson {
    @serializable
    id: string

    @serializable
    name: string

    @serializable
    semester: string

    @serializable(object(teacher))
    teacher: {
        id: string
        name: string
    }
}
