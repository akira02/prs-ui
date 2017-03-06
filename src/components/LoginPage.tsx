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
        this.props.auth.login(formData)
    }
    @autobind
    onCheck (event, checked) {
        event.preventDefault()
        this.props.auth.remember = !this.props.auth.remember
    }
    render () {
        const {auth} = this.props
        return <Page>
            <form id="login" onSubmit={this.onSubmit}>
                <TextField type="text" name="username"
                    hintText="Username Field"
                    floatingLabelText="Username" />
                <br />
                <TextField type="password" name="password"
                    hintText="Username Field"
                    floatingLabelText="Password" />
                <br />
                <Checkbox label="Remember Me" checked={auth.remember} onCheck={this.onCheck}/>
                <RaisedButton type="submit">Login</RaisedButton>
            </form>
        </Page>
    }
}