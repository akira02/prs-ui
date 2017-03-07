import * as React from 'react'
import Paper from 'material-ui/Paper'

export const Page = ({children}: {children?: any}) =>
    <Paper className="page" rounded={false} children={children} />