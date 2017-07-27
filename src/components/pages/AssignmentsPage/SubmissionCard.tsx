import * as React from 'react'
import { observer } from 'mobx-react'
import { CardHeader, CardText } from 'material-ui/Card'

import { CustomCard } from '../../CustomCard'

import { Submission } from '../../../stores/Submission'

interface Props {
    submission: Submission
}

@observer
export class SubmissionCard extends React.Component<Props> {
    render() {
        const { submission } = this.props

        return (
            <CustomCard>
                <CardHeader title={submission.username} />
                <CardText>
                    {submission.link}
                </CardText>
            </CustomCard>
        )
    }
}
