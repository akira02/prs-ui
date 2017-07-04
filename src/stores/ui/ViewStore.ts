import {observable} from 'mobx'
import {PageData} from './PageData'

export class ViewStore {
    @observable page: PageData | null = null
}