import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { SideMenu } from './SideMenu'

import { SlideRoute } from './SlideRoute'
import { LoginPage } from './LoginPage'
import { GoodPage } from './GoodPage'
import { IndexPage } from './IndexPage'

import { History } from '../store/history'

interface Props {
    history?: History
}

export const App = inject('history')(observer<Props>(({history}) =>
    <MuiThemeProvider>
        <Router history={history.inner}>
            <div className="app">
                <SideMenu />
                <div className="page-container">
                    <SlideRoute exact path="/" component={IndexPage} />
                    <SlideRoute path="/login" component={LoginPage} />
                    <SlideRoute path="/good" component={GoodPage} />
                </div>
            </div>
        </Router>
    </MuiThemeProvider>
))