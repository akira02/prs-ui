import * as React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react' 

import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import { LessonStore } from 'prs-ui/stores/LessonStore'

export interface Props {
    store: LessonStore
}

@observer
export class LessonCard extends React.Component<Props, void> {
    @action.bound
    handleExpandChange (newExpandedState: boolean) {
        this.props.store.expanded = newExpandedState
        if (newExpandedState === true) {
            this.props.store.fetchAssignments()
        }
    }
    render () {
        const {lesson, assignments, expanded} = this.props.store
        return <Card
            className="card"
            expanded={expanded}
            onExpandChange={this.handleExpandChange}>
            <CardHeader
                title={lesson.name}
                subtitle={lesson.teacher.name}
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