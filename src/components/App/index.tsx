import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from '../../theme'

// components
import { MessageBar } from '../MessageBar'
import { PageSwitch } from '../PageSwitch'

// stylesheets
import './main.css'
import './style.css'

/**
 * 根 react 元件
 * 用來注入 material-ui 的主題
 * @export
 * @class App
 * @extends {React.Component}
 */
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