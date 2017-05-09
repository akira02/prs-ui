import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { RequireToken } from 'prs-ui/components/RequireToken'
import { Page } from '../Page'
import { AssignmentCard } from './FormCard'

import { AssignmentList, AssignmentInput, Message } from 'prs-ui/stores'

export interface Props {
    assignmentList?: AssignmentList
    assignmentInput?: AssignmentInput
    message?: Message
}

@inject('assignmentList', 'assignmentInput', 'message') @observer
export class FormsPage extends React.Component<Props, void> {
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
                        <AssignmentCard key={assignment.id} assignment={assignment}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}