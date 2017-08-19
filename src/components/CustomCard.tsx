import * as React from 'react'
import styled from 'styled-components'
import { Card } from 'material-ui/Card'

interface OnTouchTapProps {
    onTouchTap?: React.TouchEventHandler<HTMLElement>
}

type Props = OnTouchTapProps & __MaterialUI.Card.CardProps

export const CustomCard = styled<Props>(Card)`
    background-color: rgba(245, 248, 251, 0.1) !important;   
`
