import {observable, computed} from 'mobx'
import * as MobileDetect from 'mobile-detect'

import {history} from './history'

const md = new MobileDetect(window.navigator.userAgent)

export class SideMenuStore {
    readonly docked: boolean = md.phone() == null
    @observable open: boolean = false

    @computed get path (): string {
        return history.location.pathname
    }
    set path (path: string) {
        history.push(path)
    }
}

export const sideMenu = new SideMenuStore()