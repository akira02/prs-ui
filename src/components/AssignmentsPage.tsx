import * as React from 'react'
import {inject, observer} from 'mobx-react'

import {RequireToken} from './RequireToken'
import {Page} from './Page'
import {AssignmentCard} from './AssignmentCard'

import {AssignmentList} from '../store/assignmentList'

export interface Props {
    assignmentList: AssignmentList
}

@inject('assignmentList') @observer
export class AssignmentsPage extends React.Component<Props, void> {
    constructor (props, context) {
        super(props, context)
        this.props.assignmentList.fetch()
    }
    render () {
        const {assignments} = this.props.assignmentList
        return <RequireToken>
            <Page>
                {
                    assignments.map(assignment => 
                        <AssignmentCard key={assignment._id} assignment={assignment}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}