import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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
    @action.bound
    handleAdd () {
        
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
                <FloatingActionButton className="button-fixed" onTouchTap={this.handleAdd}>
                    <ContentAdd />
                </FloatingActionButton>
            </Page>
        </RequireToken>
    }
}