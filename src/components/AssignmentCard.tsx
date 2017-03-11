import * as React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import {Assignment} from '../models/Assignment'

export const AssignmentCard = ({assignment}: {assignment: Assignment}) =>
    <Card className="assignment-card">
        <CardHeader title={assignment.id} />
        <CardText>{assignment.due}</CardText>
    </Card>