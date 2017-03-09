import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {RequireToken} from './RequireToken'
import {Page} from './Page'
import {AssignmentCard} from './AssignmentCard'

import {AssignmentList} from '../stores'

export interface Props {
    assignmentList: AssignmentList
}

@inject('assignmentList') @observer
export class AssignmentsPage extends React.Component<Props, void> {
    @action.bound
    handleLoggedIn () {
        this.props.assignmentList.fetch()
    }
    render () {
        const {assignments} = this.props.assignmentList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
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