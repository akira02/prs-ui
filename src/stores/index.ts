import {Auth} from './Auth'
import {History} from './History'
import {SideMenuStore} from './SideMenuStore'
import {AssignmentList} from './AssignmentList'
import {Message} from './Message'

export {Auth, History, SideMenuStore, AssignmentList, Message}

export class Stores {
    readonly auth = new Auth()
    readonly history: Readonly<History> = new History()
    readonly sideMenu = new SideMenuStore(this.history)
    readonly assignmentList = new AssignmentList(this.auth)
    readonly message = new Message()
}
