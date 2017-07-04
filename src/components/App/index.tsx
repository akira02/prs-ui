import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from '../../theme'

// components
import { MessageBar } from '../MessageBar'
import { PageSwitch } from '../PageSwitch'

// stylesheets
import './main.css'
import './style.css'

export class App extends React.Component {
    render () {
        return <MuiThemeProvider muiTheme={theme}>
            <div className="app">
                <div className="page-container">
                    <PageSwitch />
                </div>
                <MessageBar />
            </div>
        </MuiThemeProvider>
    }
}