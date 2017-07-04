import * as React from 'react'
import {computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {List, ListItem} from 'material-ui/List'

import {History} from '../../../../stores/History'
import {CourseStore} from '../../../../stores/CourseStore'

interface Props {
    selectedCourse: CourseStore

    // injected props
    history?: History
}

@inject('history') @observer
export class SubPageSelect extends React.Component<Props> {
    @action.bound
    handlePath (event, path: string) {
        this.props.history.push(path)
    }

    @computed get path (): string {
        return this.props.history.location.pathname
    }

    @computed get prefix (): string {
        const courseId = this.props.selectedCourse.course.id
        return `/courses/${courseId}`
    }

    render () {
        const {history, selectedCourse} = this.props

        return <List value={page} onChange={this.handlePath}>
            <ListItem value={`${this.prefix}/assignments`} primaryText="Assignments" />
            <ListItem value={`${this.prefix}/forms`} primaryText="Forms" />
            <ListItem value={`${this.prefix}/assignments`} primaryText="Students" />
        </List>
    }
}