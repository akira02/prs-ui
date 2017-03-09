import {observable, computed} from 'mobx'
import * as MobileDetect from 'mobile-detect'

import {History} from './History'

const md = new MobileDetect(window.navigator.userAgent)

export class SideMenuStore {
    private readonly history: Readonly<History>

    readonly docked: boolean = md.phone() == null
    @observable open: boolean = false

    constructor (history: Readonly<History>) {
        this.history = history
    }

    @computed get path (): string {
        return this.history.location.pathname
    }
    set path (path: string) {
        this.history.push(path)
    }
}
