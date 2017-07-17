import {Auth} from './Auth'
import {History} from './History'
import {CourseMap} from './CourseMap'

import {Message} from './ui/Message'
import {ViewStore} from './ui/ViewStore'

/**
 * 所有 store 的 root
 * new 這個 class 時會一次創好所有的 store
 * 
 * 基本上只在 main 裡 new 一次
 * 
 * 注意裡面每個 member 的先後代表創造的先後順序
 * 所以被依賴的 store 要寫在依賴他的 store 之前
 * @export
 * @class Stores
 */
export class Stores {
    readonly auth = new Auth()
    readonly history: Readonly<History> = new History()
    readonly courseMap = new CourseMap(this.auth)
    
    readonly message = new Message()
    readonly viewStore = new ViewStore(this.auth, this.history, this.courseMap)
}
