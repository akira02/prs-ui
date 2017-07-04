import * as React from 'react'
import {observer} from 'mobx-react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import {AssignmentStore} from '../../../stores/AssignmentStore'

interface Props {
    store: AssignmentStore
}

@observer
export class AssignmentCard extends React.Component<Props> {
    render () {
        const {store} = this.props
        const assignment = store.assignment

        return <Card className="card">
            <CardHeader 
                title={assignment.name}
                subtitle={assignment.created_date}
                actAsExpander={true}
                showExpandableButton={true} />
            <CardText expandable={true}>
                {assignment.data_link}<br />
                {assignment.description}
            </CardText>
        </Card>
    }
}