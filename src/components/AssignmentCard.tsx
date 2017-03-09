import * as React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import {Assignment} from '../models/Assignment'

export const AssignmentCard = ({assignment}: {assignment: Assignment}) =>
    <Card>
        <CardHeader title={assignment.name} />
        <CardText>{assignment.data_link}</CardText>
    </Card>