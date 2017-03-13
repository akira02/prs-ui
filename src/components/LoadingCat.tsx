import * as React from 'react'
import classNames from 'classnames'

export interface Props {
    loading: boolean
    [prop: string]: any
}

export const LoadingCat = ({loading, children, className, ...rest}) =>
    loading
        ? <div className={classNames(className, 'loading-cat')} {...rest} />
        : children
    