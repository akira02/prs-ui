import * as React from 'react'
import styled from 'styled-components'
import { Card } from 'material-ui/Card'

interface OnTouchTapProps {
    onTouchTap?: React.TouchEventHandler<HTMLElement>
}

type Props = OnTouchTapProps & __MaterialUI.Card.CardProps

export const CustomCard = styled<Props>(Card)`
    background-color: transparent !important;
    margin: 8px;
`
