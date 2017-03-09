import {observable, action} from 'mobx'

export interface Action {
    name: string,
    run(): void
}

export class Message {
    @observable action?: Action = null
    @observable text: string = ''
    @observable isError: boolean = false
    @observable open: boolean = false

    @action
    show (text: string, action: Action = null) {
        this.open = true
        this.text = text
        this.isError = false
        this.action = action
    }

    @action
    error (text: string, action: Action = null) {
        this.open = true
        this.text = text
        this.isError = true
        this.action = action
    }
}