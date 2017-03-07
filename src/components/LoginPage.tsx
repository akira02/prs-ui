import * as React from 'react'
import {observer, inject} from 'mobx-react'
import autobind from 'autobind-decorator'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import {Auth} from '../store/auth'
import {History} from '../store/history'

import {Page} from './Page'

interface Props {
    auth?: Auth
    history?: History
}

@inject('auth', 'history') @observer
export class LoginPage extends React.Component<Props, void> {
    @autobind
    onSubmit (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        this.props.auth.login()
    }
    @autobind
    onCheck (event, checked) {
        this.props.auth.remember = checked
    }
    @autobind
    handleName (event, value) {
        this.props.auth.name = value
    }
    @autobind
    handlePassword (event, value) {
        this.props.auth.password = value
    }
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
        if (auth.isLoggedIn) {
            this.gotoNextPage()
        }
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