import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from '../theme'

// components
import { MessageBar } from './MessageBar'
import { PageSwitch } from './PageSwitch'

const DevTools =
    process.env.NODE_ENV != 'production'
        ? require('mobx-react-devtools').default
        : null

injectGlobal`
    body {
        margin: 0;
    }
`

const AppWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
`

/**
 * 根 react 元件
 * 用來注入 material-ui 的主題
 * @export
 * @class App
 * @extends {React.Component}
 */
export class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <AppWrapper>
                    <PageSwitch />
                    <MessageBar />
                    {process.env.NODE_ENV != 'production' ? <DevTools /> : null}
                </AppWrapper>
            </MuiThemeProvider>
        )
    }
}
