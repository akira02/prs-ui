import * as React from 'react'

/** 幫 react 把 tap-event-plugin 的 onTouchTap 定義到所有 html 元件上 */
declare module 'react' {
    interface HTMLProps<T> {
        onTouchTap?: React.TouchEventHandler<T>
    }
}
