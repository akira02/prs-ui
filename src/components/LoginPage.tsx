import * as React from 'react'
import {observer, inject} from 'mobx-react'
import autobind from 'autobind-decorator'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import {Auth} from '../store/auth'
import {Page} from './Page'

interface Props {
    auth?: Auth
}

@inject('auth') @observer
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