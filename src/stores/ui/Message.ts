import {types} from 'mobx-state-tree'
import {observable, action} from 'mobx'

/**
 * 用來設定通知右邊的按鈕
 * @export
 * @interface Action
 */
export interface Action {
    /**
     * 按鈕的名字
     * @type {string}
     * @memberof Action
     */
    name: string

    /**
     * 被點之後要執行的動作
     * @memberof Action
     */
    run(): void
}

/** 用來控制下方通知條 */
export const MessageModel = types.model(
    'Message',
    {
        action: types.optional(types.frozen, null),
        text: '',
        isError: false,
        open: false
    },
    {
        /**
         * 顯示一般通知
         * @param {string} text 通知文字
         * @param {(Action | null)} [action=null] 點下通知右邊按鈕後要執行的動作
         */
        show (text: string, action: Action | null = null) {
            this.open = true
            this.text = text
            this.isError = false
            this.action = action
        },

        /**
         * 顯示錯誤通知
         * @param {string} text 通知文字
         * @param {(Action | null)} [action=null] 點下通知右邊按鈕後要執行的動作
         */
        error (text: string, action: Action | null = null) {
            this.open = true
            this.text = text
            this.isError = true
            this.action = action
        },

        close () {
            this.open = false
        }

    }
)

export type Message = typeof MessageModel.Type