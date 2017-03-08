import * as React from 'react'
import {inject, observer} from 'react-dom'
import {RequireToken} from './RequireToken'
import {Page} from './Page'

import {AssignmentList} from '../store/assignmentList'

export interface Props {
    assignmentList: AssignmentList
}

@inject('assignmentList') @observer
export class AssignmentsPage extends React.Component<Props, void> {
    constructor () {
        super()
        this.props.assignmentList.fetch()
    }
    render () {
        const {assignments} = this.props.assignmentList
        return <RequireToken>
            <Page>
                {
                    assignments.map(assignment => {})
                }
            </Page>
        </RequireToken>
    }
}