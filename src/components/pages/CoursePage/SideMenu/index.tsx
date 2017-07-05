import * as React from 'react'
import {action, observable, computed} from 'mobx'
import {inject, observer} from 'mobx-react'

import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import {CourseSelect} from './CourseSelect'
import {SubPageSelect} from './SubPageSelect'

import {Auth} from '../../../../stores/Auth'
import {History} from '../../../../stores/History'
import {CourseMap} from '../../../../stores/CourseMap'
import {ViewStore} from '../../../../stores/ui/ViewStore'
import * as PageData from '../../../../stores/ui/PageData'

const SelectableList = makeSelectable(List)

interface Props {
    [prop: string]: any

    // injected props
    auth?: Auth
    courseMap?: CourseMap
    history?: History
    viewStore?: ViewStore
}

@inject('auth', 'history', 'courseMap', 'viewStore') @observer
export class SideMenu extends React.Component<Props> {
    @action.bound
    handlePath (event, path: string) {
        this.props.history.push(path)
    }

    @computed get path (): string {
        return this.props.history.location.pathname
    }

    render () {
        const {auth, courseMap, ...rest} = this.props
        const page = this.props.viewStore.page as PageData.Course

        return <Drawer
                docked={true}
                style={{height: '100%'}}
                containerStyle={{position: 'relative'}}
                {...rest}>

            <CourseSelect selectedCourse={page.selectedCourse} />
            
            {
                page.selectedCourse != null
                    ? <SubPageSelect selectedCourse={page.selectedCourse} />
                    : null
            }

            <List>
                <ListItem primaryText="Logout" onTouchTap={auth.logout} />
            </List>
        </Drawer>
    }
}