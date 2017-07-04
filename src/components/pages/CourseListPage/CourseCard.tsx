import * as React from 'react'
import { observer } from 'mobx-react' 

import { Card, CardHeader } from 'material-ui/Card'

import { CourseStore } from '../../../stores/CourseStore'

export interface Props {
    store: CourseStore
}

@observer
export class CourseCard extends React.Component<Props> {
    render () {
        const {course} = this.props.store

        return <Card className="card">
            <CardHeader title={course.name} />
        </Card>
    }
}