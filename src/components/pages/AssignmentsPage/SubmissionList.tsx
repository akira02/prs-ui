import * as React from 'react'
import {computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'


import {Page} from '../Page'
import {SubmissionCard} from './SubmissionCard'

import {Assignment} from '../../../stores/Assignment'

import './style.css'

export interface Props {
    selectedAssignment: Assignment | null
}

@observer
export class SubmissionList extends React.Component<Props> {
    render () {
        const {selectedAssignment} = this.props
        
        return <Page className="submission-list">
            {
                selectedAssignment == null || selectedAssignment.submissions == null
                    ? 'Loading!!!'
                    : selectedAssignment.submissions.values().map(submission =>
                        <SubmissionCard key={submission.id} submission={submission} />
                    )
            }
        </Page>
    }
}