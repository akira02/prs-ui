import {observable, action} from 'mobx'
import {History, Location} from 'history'
import createHistory from 'history/createBrowserHistory'

/**
 * Observable wrapper for Location
 */
class ObservableLocation {
    @observable pathname: string
    @observable hash: string
    @observable search: string
    @observable state: any
    @observable key: string

    constructor (location: Location) {
        this.update(location)
    }

    @action
    update (location: Location) {
        this.pathname = location.pathname
        this.search = location.search
        this.hash = location.hash
        this.state = location.state
        this.key = location.key
    }
}

/**
 * Observable wrapper for History
 */
class ObservableHistory {
    inner = createHistory()
    @observable action: string
    readonly location: Readonly<ObservableLocation>

    constructor () {
        this.action = this.inner.action
        this.location = new ObservableLocation(this.inner.location)
        this.inner.listen(this.update.bind(this))
    }

    @action
    update (location: Location, action: string) {
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

export {
    ObservableLocation as Location,
    ObservableHistory as History
}