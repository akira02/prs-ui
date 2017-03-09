import * as React from 'react'
import {action, when} from 'mobx'
import {observer, inject} from 'mobx-react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import {Auth, History} from '../stores'

import {Page} from './Page'

interface Props {
    auth?: Auth
    history?: History
}

@inject('auth', 'history') @observer
export class LoginPage extends React.Component<Props, void> {
    private dispose: () => void
    constructor (props: Props) {
        super(props)
        const disposer = when('loggedIn', () => props.auth.isLoggedIn, this.gotoNextPage)
        this.dispose = disposer
    }
    componentWillUnmount () {
        this.dispose()
    }
    @action.bound
    onSubmit (event: React.SyntheticEvent) {
        event.preventDefault()
        this.props.auth.login()
    }
    @action.bound
    onCheck (event, checked: boolean) {
        this.props.auth.remember = checked
    }
    @action.bound
    handleName (event, value: string) {
        this.props.auth.name = value
    }
    @action.bound
    handlePassword (event, value: string) {
        this.props.auth.password = value
    }
    @action.bound
    gotoNextPage () {
        const {history} = this.props
        const {goBack=false, nextPage='/'} = history.location.state || {}
        if (goBack) {
            history.goBack()
        } else {
            history.push(nextPage)
        }
    }
    render () {
        const {auth} = this.props
        return <Page id="login-wrapper">
            <form id="login" onSubmit={this.onSubmit}>
                <TextField type="text"
                    value={auth.name}
                    onChange={this.handleName}
                    hintText="Username Field"
                    floatingLabelText="Username" />
                <br />
                <TextField type="password"
                    value={auth.password}
                    onChange={this.handlePassword}
                    hintText="Password Field"
                    floatingLabelText="Password" />
                <br />
                <Checkbox label="Remember Me" checked={auth.remember} onCheck={this.onCheck} />
                <RaisedButton type="submit">Login</RaisedButton>
            </form>
        </Page>
    }
}