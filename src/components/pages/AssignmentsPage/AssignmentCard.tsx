import * as React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { Assignment } from 'prs-ui/models/Assignment'

export const AssignmentCard = ({assignment}: {assignment: Assignment}) =>
    <Card className="card">
        <CardHeader title={assignment.id} />
        <CardText expandable={true}>{assignment.due}</CardText>
    </Card>