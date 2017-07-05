import * as React from 'react'
import {observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import {api} from '../../../api'
import {Auth} from '../../../stores/Auth'
import {CourseStore} from '../../../stores/CourseStore'


interface Props {
    open: boolean
    onRequestClose?: () => void
    selectedCourse: CourseStore

    // injected props
    auth?: Auth
}

@inject('auth') @observer
export class AssignmentInput extends React.Component<Props> {
    @observable name: string = ''
    @observable description: string = ''
    @observable data_link: string = ''

    @action.bound
    async handleSubmit () {
        try {
            await api.post('assignments')
                .auth(this.props.auth.token)
                .send({
                    name: this.name,
                    description: this.description,
                    data_link: this.data_link,
                    course_id: this.props.selectedCourse.course.id
                })
            this.clear()
            this.props.onRequestClose()
            // update assignments but don't wait for result (no `await`)
            this.props.selectedCourse.fetchAssignments()
        } catch (err) {
            // TODO: show message
        }
    }

    @action.bound
    handleName (event, text: string) {
        this.name = text
    }
    @action.bound
    handleDescription (event, text: string) {
        this.description = text
    }
    @action.bound
    handleDataLink (event, text: string) {
        this.data_link = text
    }

    @action.bound
    handleCancel () {
        this.clear()
        this.props.onRequestClose()
    }

    @action.bound
    clear () {
        this.name = ''
        this.description = ''
        this.data_link = ''
    }

    render () {
        const {open} = this.props

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />,
        ]

        return <Dialog
                title="新增作業"
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}>
            <TextField type="text"
                value={name}
                onChange={this.handleName}
                required={true}
                fullWidth={true}
                hintText="作業名稱"
                floatingLabelText="新作業名稱" />
            <br />
            <TextField type="text"
                value={this.description}
                onChange={this.handleDescription}
                required={true}
                multiLine={true}
                fullWidth={true}
                hintText="作業說明"
                floatingLabelText="作業說明" />
            <br />
            <TextField type="text"
                value={this.data_link}
                onChange={this.handleDataLink}
                required={true}
                fullWidth={true}
                hintText="http://example.com/"
                floatingLabelText="參考連結" />
            <br />
        </Dialog>
    }
}