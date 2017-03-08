import * as React from 'react'
import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'

import {Route} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import {SideMenuStore} from '../store/sideMenu'

const SelectableList = makeSelectable(List)

interface Props {
    sideMenu?: SideMenuStore,
    [prop: string]: any
}

@inject('sideMenu') @observer
export class SideMenu extends React.Component<Props, void> {
    @autobind
    handlePathChange (event, path: string) {
        this.props.sideMenu.open = false
        this.props.sideMenu.path = path
    }
    @autobind
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
                <ListItem value="/good" primaryText="GoodPage" />
            </SelectableList>
        </Drawer>
    }
}