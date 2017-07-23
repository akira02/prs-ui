import * as React from 'react'
import styled from 'styled-components'
import Dialog from 'material-ui/Dialog'

export interface Props extends __MaterialUI.DialogProps {
    src: string
    open: boolean
    children?: React.ReactNode
}

const StyledIframe = styled.iframe`
    width:100%;
`

export const IframeDialog = (props: Props) => {
    const { src, children, ...rest } = props
    return (
        <Dialog {...rest}>
            {children}
            {props.open ? <StyledIframe src={src} /> : null}
        </Dialog>
    )
}
