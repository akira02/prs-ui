import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react' 

import { Card, CardHeader } from 'material-ui/Card'

import { History } from '../../../stores/History'
import { CourseStore } from '../../../stores/CourseStore'

export interface Props {
    store: CourseStore

    // injected props
    history?: History
}

@inject('history') @observer
export class CourseCard extends React.Component<Props> {
    @action.bound
    handleTouchTap () {
        const {store, history} = this.props
        history.push(`/courses/${store.course.id}`)
    }

    render () {
        const {course} = this.props.store

        return <Card className="card" onTouchTap={this.handleTouchTap}>
            <CardHeader title={course.name} />
        </Card>
    }
}