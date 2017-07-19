import * as React from 'react'
import {observable, computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'


import {List, ListItem, makeSelectable} from 'material-ui/List'

import {History} from '../../../../stores/History'
import {CourseMap} from '../../../../stores/CourseMap'
import {CourseStore} from '../../../../stores/CourseStore'

const SelectableList = makeSelectable(List)

interface Props {
    selectedCourse: CourseStore | null
    history?: History
    courseMap?: CourseMap
}

@inject('history', 'courseMap') @observer
export class CourseSelect extends React.Component<Props> {
    @observable open: boolean = false

    @computed get sortedCourses (): CourseStore[] {
        return this.props.courseMap.courseStores.values()
            .sort((a, b) => a.course.name.localeCompare(b.course.name))
    }

    componentDidMount () {
        this.props.courseMap.fetch()
    }

    @action.bound
    handleToggle () {
        this.open = !this.open
    }

    @action.bound
    handleSelect (event, courseId: string | null) {
        if (courseId == null) return
        this.props.history.push(`/courses/${courseId}`)
        this.open = false
    }

    render () {
        const {selectedCourse, courseMap} = this.props

        return <SelectableList value={selectedCourse} onChange={this.handleSelect}>
            <ListItem
                open={this.open}
                value={null}
                onNestedListToggle={this.handleToggle}
                onTouchTap={this.handleToggle}
                primaryText={selectedCourse && selectedCourse.course.name}
                nestedItems={
                    this.sortedCourses.map(store =>
                        <ListItem key={store.course.id} value={store.course.id} primaryText={store.course.name} />
                    )
                } />
        </SelectableList>
    }
}
