import * as React from 'react'
import { action, observable, computed } from 'mobx'
import { inject, observer } from 'mobx-react'

import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'

import { CourseSelect } from './CourseSelect'
import { SubPageSelect } from './SubPageSelect'

import { Auth } from '../../../../stores/Auth'
import { History } from '../../../../stores/History'
import * as PageData from '../../../../stores/ui/PageData'

const SelectableList = makeSelectable(List)

interface Props {
    page: PageData.CoursePage

    // injected props
    auth?: Auth
    history?: History
}

@inject('auth', 'history')
@observer
export class SideMenu extends React.Component<Props> {
    @action.bound
    handlePath(event, path: string) {
        this.props.history.push(path)
    }

    @action.bound
    handleLogout() {
        this.props.auth.logout()
        this.props.history.replace('/')
    }

    @computed
    get path(): string {
        return this.props.history.location.pathname
    }

    render() {
        const { auth, history, page, ...rest } = this.props

        return (
            <Drawer
                docked={true}
                style={{ height: '100%', backgroundColor: 'transparent' }}
                containerStyle={{ position: 'relative', backgroundColor: 'transparent'}}
                {...rest}
            >
                <CourseSelect selectedCourse={page.selectedCourse} />

                {page.selectedCourse != null
                    ? <SubPageSelect selectedCourse={page.selectedCourse} />
                    : null}

                <List>
                    <ListItem primaryText="登出" onTouchTap={this.handleLogout} />
                </List>
                <p style={{
                    position:'absolute',
                    bottom:'0px',
                    right:'15px',
                    fontSize:'0.7em',
                    fontWeight:'normal',
                    textAlign:'right'
                }}>Copyright © 2017 PRS team.<br/>
                UI designed by 千秋</p>
            </Drawer>
        )
    }
}
