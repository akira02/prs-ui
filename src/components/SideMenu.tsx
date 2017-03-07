import * as React from 'react'
import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'

import {Route} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import {History} from '../store/history'

const SelectableList = makeSelectable(List)

interface Props {
    history?: History,
    [prop: string]: any
}

@inject('history') @observer
export class SideMenu extends React.Component<Props, void> {
    @autobind
    handleChange (event, pathname: string) {
        this.props.history.push(pathname)
    }
    render () {
        const {history, ...rest} = this.props
        return <Drawer docked={true} containerStyle={{position: 'relative'}} {...rest}>
            <SelectableList value={history.location.pathname} onChange={this.handleChange}>
                <ListItem value="/" primaryText="IndexPage" />
                <ListItem value="/good" primaryText="GoodPage" />
            </SelectableList>
        </Drawer>
    }
}