import * as React from 'react'

declare module 'react' {
    interface HTMLProps<T> {
        onTouchTap?: React.TouchEventHandler<T>
    }
}
