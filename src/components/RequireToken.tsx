import * as React from 'react'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Auth, History } from 'prs-ui/stores'

interface Props {
    auth?: Auth,
    history?: History,
    onLoggedIn?: () => void
}

@inject('auth', 'history') @observer
export class RequireToken extends React.Component<Props, void> {
    private dispose: () => void
    constructor (props: Props) {
        super(props)
        const disposer = autorun(() => {
            if (props.auth.isLoggedIn === true && props.onLoggedIn != null) {
                props.onLoggedIn()
            }
        })
        this.dispose = disposer
    }
    componentWillUnmount () {
        this.dispose()
    }
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
