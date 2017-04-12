import {Auth} from './Auth'
import {History} from './History'
import {SideMenuStore} from './SideMenuStore'
import {AssignmentList} from './AssignmentList'
import {AssignmentInput} from './AssignmentInput'
import {CourseList} from './CourseList'
import {UserList} from './UserList'
import {Message} from './Message'

export {
    Auth,
    History,
    SideMenuStore,
    AssignmentList,
    AssignmentInput,
    CourseList,
    UserList,
    Message
}

export class Stores {
    readonly auth = new Auth()
    readonly history: Readonly<History> = new History()
    readonly sideMenu = new SideMenuStore(this.history)
    readonly assignmentList = new AssignmentList(this.auth)
    readonly assignmentInput = new AssignmentInput(this.auth)
    readonly courseList = new CourseList(this.auth)
    readonly userList = new UserList(this.auth)
    readonly message = new Message()
}
