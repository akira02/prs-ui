import * as React from 'react'

import Dialog from 'material-ui/Dialog'

export interface Props {
    src: string
    open: boolean
    children?: React.ReactNode

    [x: string]: any
}

export const IframeDialog = (props: Props) => {
    const {src, children, ...rest} = props
    return <Dialog {...rest}>
        {children}
        {props.open ? <iframe src={src}></iframe> : null}
    </Dialog>
}
