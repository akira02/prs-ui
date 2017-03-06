import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Auth } from '../store/auth'
import { History } from '../store/history'

interface Props {
    auth?: Auth,
    history?: History
}

@inject('auth', 'history') @observer
export class RequireToken extends React.Component<Props, void> {
    render () {
        const {auth, history, children} = this.props
        if (auth.token == null) {
            const dest = {
                pathname: '/login',
                search: `?nextPage=${encodeURIComponent(history.location.pathname)}`
            }
            return <Redirect to={dest}></Redirect>
        } else {
            return children as React.ReactElement<any>
        }
    }
}
