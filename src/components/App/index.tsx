import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Router } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from 'prs-ui/theme'

import { SideMenu } from '../SideMenu'
import { SlideRoute } from '../SlideRoute'
import { LoginPage } from '../pages/LoginPage'
import { IndexPage } from '../pages/IndexPage'
import { AssignmentsPage } from '../pages/AssignmentsPage'
import { CoursesPage } from '../pages/CoursesPage'
import { UsersPage } from '../pages/UsersPage'
import { FormsPage } from '../pages/FormsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MessageBar } from '../MessageBar'

import { History } from 'prs-ui/stores'

import './main.css'
import './style.css'

interface Props {
    history?: History
}

export const App = inject('history')(observer<Props>(({history}) =>
    <MuiThemeProvider muiTheme={theme}>
        <Router history={history.inner}>
            <div className="app">
                <SideMenu />
                <div className="page-container">
                    <Switch>
                        <SlideRoute exact path="/" component={IndexPage} />
                        <SlideRoute path="/login" component={LoginPage} />
                        <SlideRoute path="/assignments" component={AssignmentsPage} />
                        <SlideRoute path="/courses" component={CoursesPage} />
                        <SlideRoute path="/users" component={UsersPage} />
                        <SlideRoute path="/forms" component={FormsPage} />
                        <SlideRoute path="*" component={NotFoundPage} />
                    </Switch>
                </div>
                <MessageBar />
            </div>
        </Router>
    </MuiThemeProvider>
))