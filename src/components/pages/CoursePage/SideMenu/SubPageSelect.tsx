import * as React from 'react'
import {computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {List, ListItem, makeSelectable} from 'material-ui/List'

import {History} from '../../../../stores/History'
import {Course} from '../../../../stores/Course'

const SelectableList = makeSelectable(List)

interface Props {
    selectedCourse: Course

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
        const courseId = this.props.selectedCourse.id
        return `/courses/${courseId}`
    }

    render () {
        const {history, selectedCourse} = this.props

        return <SelectableList value={null} onChange={this.handlePath}>
            <ListItem value={`${this.prefix}/assignments`} primaryText="作業" />
            <ListItem value={`${this.prefix}/forms`} primaryText="課程評鑑" />
            <ListItem value={`${this.prefix}/students`} primaryText="學生名單" />
        </SelectableList>
    }
}