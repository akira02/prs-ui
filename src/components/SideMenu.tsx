import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {Route} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import {Auth, SideMenuStore} from 'prs-ui/stores'

const SelectableList = makeSelectable(List)

interface Props {
    sideMenu?: SideMenuStore,
    auth?: Auth
    [prop: string]: any
}

@inject('sideMenu', 'auth') @observer
export class SideMenu extends React.Component<Props, void> {
    @action.bound
    handlePathChange (event, path: string) {
        this.props.sideMenu.open = false
        this.props.sideMenu.path = path
    }
    @action.bound
    handleOpenStateChange (state: boolean, reason: string) {
        this.props.sideMenu.open = state
    }
    render () {
        const {sideMenu, ...rest} = this.props
        return <Drawer
                docked={sideMenu.docked}
                open={sideMenu.docked ? null : sideMenu.open}
                onRequestChange={this.handleOpenStateChange}
                style={{height: '100%'}}
                containerStyle={sideMenu.docked ? {position: 'relative'} : null}
                {...rest}>
            <SelectableList value={sideMenu.path} onChange={this.handlePathChange}>
                <ListItem value="/" primaryText="IndexPage" />
                <ListItem value="/assignments" primaryText="AssignmentsPage" />
                <ListItem value="/lessons" primaryText="LessonsPage" />
            </SelectableList>
            <List>
                <ListItem primaryText="Logout" onTouchTap={this.props.auth.logout} />
            </List>
        </Drawer>
    }
}