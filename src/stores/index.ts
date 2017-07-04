import {Auth} from './Auth'
import {History} from './History'
import {CourseMap} from './CourseMap'

import {Message} from './ui/Message'
import {ViewStore} from './ui/ViewStore'

export class Stores {
    readonly auth = new Auth()
    readonly history: Readonly<History> = new History()
    readonly courseMap = new CourseMap(this.auth)
    
    readonly message = new Message()
    readonly viewStore = new ViewStore()
}
