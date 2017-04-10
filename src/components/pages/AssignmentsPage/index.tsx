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
import { AssignmentCard } from './AssignmentCard'

import { AssignmentList } from 'prs-ui/stores'

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
        this.props.assignmentList.open = true
    }
    @action.bound
    handleClose () {
        this.props.assignmentList.open = false
    }
    @action.bound
    handleAssignmentName(event, text:string){
        this.props.assignmentList.assignmentName = text
    }
    render () {
        const {assignments, open, assignmentName} = this.props.assignmentList
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}

            />,
        ];
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
        
            <Page>
                {
                    assignments.map(assignment =>
                        <AssignmentCard key={assignment.id} assignment={assignment}/>
                    )
                }

                <FloatingActionButton className="button-fixed" onTouchTap={this.handleAdd}>
                    <ContentAdd />
                </FloatingActionButton>
                
                <Dialog
                    title="繳交"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    >
                        <TextField type="text"
                            value={assignmentName}
                            onChange={this.handleAssignmentName}
                            required={true}
                            hintText="新作業名稱"
                            floatingLabelText="作業名稱" />
                        <br />
                </Dialog>
            </Page>
        </RequireToken>
    }
}