import {observable} from 'mobx'
import {serializable, createSimpleSchema, object} from 'serializr'

export class User {
    @serializable
    @observable id: string

    @serializable
    @observable name: string
}

