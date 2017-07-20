import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react' 

import { Card, CardHeader } from 'material-ui/Card'

import { History } from '../../../stores/History'
import { Course } from '../../../stores/Course'

export interface Props {
    course: Course

    // injected props
    history?: History
}

@inject('history') @observer
export class CourseCard extends React.Component<Props> {
    @action.bound
    handleTouchTap () {
        const {course, history} = this.props
        history.push(`/courses/${course.id}`)
    }

    render () {
        const {course} = this.props

        return <Card className="course_card card" onTouchTap={this.handleTouchTap}>
            <CardHeader title={course.name} />
        </Card>
    }
}