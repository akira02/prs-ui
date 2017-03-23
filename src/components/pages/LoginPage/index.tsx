import * as React from 'react'
import { action, when } from 'mobx'
import { observer, inject } from 'mobx-react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Page } from '../Page'

import { StatusCodeError } from 'prs-ui/api'
import { Auth, History, Message } from 'prs-ui/stores'

import './style.css'

interface Props {
    auth?: Auth
    history?: History
    message?: Message
}

@inject('auth', 'history', 'message') @observer
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
    async onSubmit (event: React.SyntheticEvent) {
        event.preventDefault()
        try {
            await this.props.auth.login()
        } catch (error) {
            if (error instanceof StatusCodeError && error.status == 403) {
                this.props.message.error('Incorrect username or password. Please try again')
            } else {
                this.props.message.error('Login failed. Please try again')
            }
        }
    }
    @action.bound
    onCheck (event, checked: boolean) {
        this.props.auth.remember = checked
    }
    @action.bound
    handleUserame (event, value: string) {
        this.props.auth.username = value
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
                    value={auth.username}
                    onChange={this.handleUserame}
                    required={true}
                    hintText="測試期間預設testtesttest"
                    floatingLabelText="帳號" />
                <br />
                <TextField type="password"
                    value={auth.password}
                    onChange={this.handlePassword}
                    required={true}
                    hintText="測試期間預設123123"
                    floatingLabelText="密碼" />
                <br />
                <Checkbox label="Remember Me" checked={auth.remember} onCheck={this.onCheck} />
                <RaisedButton type="submit">Login</RaisedButton>
            </form>
        </Page>
    }
}