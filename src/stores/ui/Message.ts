import { types } from 'mobx-state-tree'
import { observable, action, IObservableValue } from 'mobx'

/** 用來設定通知右邊的按鈕 */
export interface Action {
    /** 按鈕的名字 */
    readonly name: string

    /** 被點之後要執行的動作 */
    run(): void
}

/** 用來控制下方通知條 */
export const MessageModel = types.model(
    'Message',
    {
        text: '',
        isError: false,
        open: false,
        get action(): Action | null {
            return this.actionBox.get()
        }
    },
    {
        actionBox: null as IObservableValue<Action | null>
    },
    {
        afterCreate() {
            this.actionBox = observable.shallowBox(null)
        },

        /**
         * 顯示一般通知
         * @param text    通知文字
         * @param action  點下通知右邊按鈕後要執行的動作
         */
        show(text: string, action: Action | null = null) {
            this.open = true
            this.text = text
            this.isError = false
            this.actionBox.set(action)
        },

        /**
         * 顯示錯誤通知
         * @param text    通知文字
         * @param action  點下通知右邊按鈕後要執行的動作
         */
        error(text: string, action: Action | null = null) {
            this.open = true
            this.text = text
            this.isError = true
            this.actionBox.set(action)
        },

        /**
         * 隱藏通知條
         */
        close() {
            this.open = false
        }
    }
)

export type Message = typeof MessageModel.Type
