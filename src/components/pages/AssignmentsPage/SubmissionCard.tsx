import * as React from 'react'
import {observer} from 'mobx-react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import {Submission} from '../../../models/Submission'

interface Props {
    submission: Submission
}

@observer
export class SubmissionCard extends React.Component<Props> {
    render () {
        const {submission} = this.props

        return <Card className="card">
            <CardHeader title={submission.username} />
            <CardText>{submission.link}</CardText>
        </Card>
    }
}