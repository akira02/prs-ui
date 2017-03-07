import * as React from 'react'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'

export const Page = (props: any) => {
    const {className=null, ...rest} = props || {}
    return <Paper
        className={classNames('page', className)}
        transitionEnabled={false}
        rounded={false}
        {...rest} />
}