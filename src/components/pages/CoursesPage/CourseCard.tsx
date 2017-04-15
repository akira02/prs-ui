import * as React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react' 

import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import { CourseStore } from 'prs-ui/stores/CourseStore'

export interface Props {
    store: CourseStore
}

@observer
export class CourseCard extends React.Component<Props, void> {
    @action.bound
    handleExpandChange (newExpandedState: boolean) {
        this.props.store.expanded = newExpandedState
        if (newExpandedState === true) {
            this.props.store.fetchAssignments()
        }
    }
    render () {
        const {course, assignments, expanded} = this.props.store
        return <Card
            className="card"
            expanded={expanded}
            onExpandChange={this.handleExpandChange}>
            <CardHeader
                title={course.name}
                actAsExpander={true}
                showExpandableButton={true} />
            
            <CardMedia expandable={true}>
                <List>
                {
                    assignments.map(assignment => 
                        <ListItem key={assignment.id} primaryText={assignment.id} />
                    )
                }
                </List>
            </CardMedia>
        </Card>
    }
}