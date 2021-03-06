import * as React from 'react'
import styled from 'styled-components'
import { defaultProps } from 'recompose'
import Paper from 'material-ui/Paper'

const StyledPaper = styled(Paper)`
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: white;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
`

export const Page = (props: __MaterialUI.PaperProps) =>
    <StyledPaper transitionEnabled={false} rounded={false} {...props} />
