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

import { AssignmentList, Message } from 'prs-ui/stores'

export interface Props {
    assignmentList: AssignmentList
    message?: Message
}

@inject('assignmentList', 'message') @observer
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
    async handleSubmit () {
        try {
            await this.props.assignmentList.submit()
            this.props.message.show('Success!!')
        } catch (error) {
            this.props.message.error('Failed!!')
        }
    }
    @action.bound
    handleClose () {
        this.props.assignmentList.open = false
    }

    @action.bound
    handleAssignmentName(event, text:string){
        this.props.assignmentList.assignmentName = text
    }
    @action.bound
    handleAssignmentDescription(event, text:string){
        this.props.assignmentList.assignmentDescription = text
    }
    @action.bound
    handleAssignmentData_link(event, text:string){
        this.props.assignmentList.assignmentData_link = text
    }
    
    render () {
        const {
            assignments, 
            open, 
            assignmentName, 
            assignmentDescription, 
            assignmentData_link} = this.props.assignmentList

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
                onTouchTap={this.handleSubmit}

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
                    title="新增作業"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                        <TextField type="text"
                            value={assignmentName}
                            onChange={this.handleAssignmentName}
                            required={true}
                            fullWidth={true}
                            hintText="作業名稱"
                            floatingLabelText="新作業名稱" />
                        <br />
                        <TextField type="text"
                            value={assignmentDescription}
                            onChange={this.handleAssignmentDescription}
                            required={true}
                            multiLine={true}
                            fullWidth={true}
                            hintText="作業說明"
                            floatingLabelText="作業說明" />
                        <br />
                        <TextField type="text"
                            value={assignmentData_link}
                            onChange={this.handleAssignmentData_link}
                            required={true}
                            fullWidth={true}
                            hintText="http://example.com/"
                            floatingLabelText="參考連結" />
                        <br />
                </Dialog>
            </Page>
        </RequireToken>
    }
}