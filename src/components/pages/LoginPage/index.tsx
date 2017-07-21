import * as React from 'react'
import { observable, action, when } from 'mobx'
import { observer, inject } from 'mobx-react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Page } from '../Page'

import { Auth } from '../../../stores/Auth'
import { Message } from '../../../stores/ui/Message'

import './style.css'

interface Props {
    auth?: Auth
    message?: Message
}

@inject('auth', 'message') @observer
export class LoginPage extends React.Component<Props> {
    private dispose: () => void

    @observable username: string = ''
    @observable password: string = ''

    @action.bound
    async onSubmit (event) {
        event.preventDefault()
        try {
            await this.props.auth.login(this.username, this.password)
        } catch (error) {
            if (error && error.status == 403) {
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
        this.username = value
    }
    @action.bound
    handlePassword (event, value: string) {
        this.password = value
    }
    render () {
        const {auth} = this.props
        return <Page id="login-wrapper">
            <form id="login" onSubmit={this.onSubmit}>
                <TextField type="text"
                    value={this.username}
                    onChange={this.handleUserame}
                    required={true}
                    hintText="測試期間預設admin"
                    floatingLabelText="帳號" />
                <br />
                <TextField type="password"
                    value={this.password}
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