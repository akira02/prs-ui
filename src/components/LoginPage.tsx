import * as React from 'react'
import {observer, inject} from 'mobx-react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {Auth} from '../store/auth'
import {Page} from './Page'

interface Props {
    auth?: Auth
}

@inject('auth') @observer
export class LoginPage extends React.Component<Props, void> {
    onSubmit (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        this.props.auth.login(formData)
    }
    render () {
        return <Page>
            <form id="login" onSubmit={this.onSubmit.bind(this)}>
                <TextField type="text" name="username"
                    hintText="Username Field"
                    floatingLabelText="Username" />
                <br />
                <TextField type="password" name="password"
                    hintText="Username Field"
                    floatingLabelText="Password" />
                <br />
                <RaisedButton type="submit">Login</RaisedButton>
            </form>
        </Page>
    }
}