import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Auth, History } from '../stores'

interface Props {
    auth?: Auth,
    history?: History
}

@inject('auth', 'history') @observer
export class RequireToken extends React.Component<Props, void> {
    render () {
        const {auth, history, children} = this.props
        if (!auth.isLoggedIn) {
            const dest = {
                pathname: '/login',
                state: {
                    goBack: true
                }
            }
            return <Redirect push to={dest}></Redirect>
        } else {
            return children as React.ReactElement<any>
        }
    }
}
