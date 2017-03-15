import {serializable, createSimpleSchema, object} from 'serializr'

const teacher = createSimpleSchema({ id: true, name: true })

export class Course {
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
