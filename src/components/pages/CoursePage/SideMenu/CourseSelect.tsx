import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { List, ListItem, makeSelectable } from 'material-ui/List'

import { History } from '../../../../stores/History'
import { CourseStore } from '../../../../stores/CourseStore'
import { Course } from '../../../../stores/Course'

const SelectableList = makeSelectable(List)

interface Props {
    selectedCourse: Course | null
    history?: History
    courseStore?: CourseStore
}

@inject('history', 'courseStore')
@observer
export class CourseSelect extends React.Component<Props> {
    @observable open: boolean = false

    @computed
    get sortedCourses(): Course[] {
        return this.props.courseStore.courses
            .values()
            .sort((a, b) => a.name.localeCompare(b.name))
    }

    @action.bound
    handleToggle() {
        this.open = !this.open
    }

    @action.bound
    handleSelect(event, courseId: string | null) {
        if (courseId == null) return
        this.props.history.push(`/courses/${courseId}`)
        this.open = false
    }

    render() {
        const { selectedCourse, courseStore } = this.props

        return (
            <SelectableList value={selectedCourse} onChange={this.handleSelect}>
                <ListItem
                    open={this.open}
                    value={null}
                    onNestedListToggle={this.handleToggle}
                    onTouchTap={this.handleToggle}
                    primaryText={selectedCourse && selectedCourse.name}
                    nestedItems={this.sortedCourses.map(course =>
                        <ListItem
                            key={course.id}
                            value={course.id}
                            primaryText={course.name}
                        />
                    )}
                />
            </SelectableList>
        )
    }
}
