import * as React from 'react'
import styled from 'styled-components'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Page } from './Page'

import { Auth } from '../../stores/Auth'
import { Message } from '../../stores/ui/Message'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { blue50 } from 'material-ui/styles/colors'

interface Props {
    auth?: Auth
    message?: Message
}

const StyledPage = styled(Page)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3ca2e0 !important;
    color: white !important;
    background-image: url(/static/pic/login-bg.jpg);
    background-size: cover;
`
const muiTheme = getMuiTheme({
    palette: {
        textColor: blue50,
        primary1Color: blue50,
        disabledColor: blue50
    }
})

@inject('auth', 'message')
@observer
export class LoginPage extends React.Component<Props> {
    private dispose: () => void

    @observable username: string = ''
    @observable password: string = ''

    @action.bound
    async onSubmit(event) {
        event.preventDefault()
        try {
            await this.props.auth.login(this.username, this.password)
        } catch (error) {
            if (error && error.status == 403) {
                this.props.message.error(
                    'Incorrect username or password. Please try again'
                )
            } else {
                this.props.message.error('Login failed. Please try again')
            }
        }
    }
    @action.bound
    onCheck(event, checked: boolean) {
        this.props.auth.setRemember(checked)
    }
    @action.bound
    handleUserame(event, value: string) {
        this.username = value
    }
    @action.bound
    handlePassword(event, value: string) {
        this.password = value
    }
    render() {
        const { auth } = this.props
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <StyledPage>
                    <form onSubmit={this.onSubmit}>
                        <img
                            src="./static/pic/img_login.svg"
                            style={{
                                marginLeft: '47px'
                            }}
                        />
                        <br />
                        <TextField
                            type="text"
                            value={this.username}
                            onChange={this.handleUserame}
                            required={true}
                            hintText="測試期間預設admin"
                            floatingLabelText="帳號"
                            style={{
                                fontWeight: 'normal'
                            }}
                        />
                        <br />
                        <TextField
                            type="password"
                            value={this.password}
                            onChange={this.handlePassword}
                            required={true}
                            hintText="測試期間預設123123"
                            floatingLabelText="密碼"
                            style={{
                                fontWeight: 'normal'
                            }}
                        />
                        <br />
                        <Checkbox
                            label="Remember Me"
                            checked={auth.remember}
                            onCheck={this.onCheck}
                        />
                        <br />
                        <RaisedButton type="submit">GOGO!</RaisedButton>
                    </form>
                </StyledPage>
            </MuiThemeProvider>
        )
    }
}
