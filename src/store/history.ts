import {observable, action} from 'mobx'
import createHistory from 'history/createBrowserHistory'

export class Location {
    @observable pathname: string
    @observable hash: string
    @observable search: string
    @observable state: any
    @observable key: string

    constructor (location) {
        this.update(location)
    }

    @action
    update (location: any) {
        this.pathname = location.pathname
        this.search = location.search
        this.hash = location.hash
        this.state = location.state
        this.key = location.key
    }
}

export class History {
    inner = createHistory()
    @observable action: string
    readonly location: Readonly<Location>

    constructor () {
        this.action = this.inner.action
        this.location = new Location(this.inner.location)
        this.inner.listen(this.update.bind(this))
    }

    @action
    update (location, action: string) {
        this.action = action
        this.location.update(location)
    }

    push (path: string, state?: any) {
        this.inner.push(path, state)
    }
    replace (path: string, state?: any) {
        this.inner.replace(path, state)
    }
    goBack () {
        this.inner.goBack()
    }
}

export const history: Readonly<History> = new History()