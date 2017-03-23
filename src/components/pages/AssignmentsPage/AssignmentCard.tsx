import * as React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { Assignment } from 'prs-ui/models/Assignment'

export const AssignmentCard = ({assignment}: {assignment: Assignment}) =>
    <Card className="card">
        <CardHeader 
            title={assignment.name}
            subtitle={assignment.created_date}
            actAsExpander={true}
            showExpandableButton={true}
             />
        <CardText expandable={true}>{assignment.data_link}<br />{assignment.description}</CardText>
    </Card>