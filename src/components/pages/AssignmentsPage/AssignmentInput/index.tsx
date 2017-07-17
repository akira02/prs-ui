import * as React from 'react'
import {observable, computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import {Stepper, Step, StepLabel} from 'material-ui/Stepper'

import {CreateAssignment} from './CreateAssignment'

import {api} from '../../../../api'
import {Auth} from '../../../../stores/Auth'
import {CourseStore} from '../../../../stores/CourseStore'

import {InputStore} from './InputStore'

interface Props {
    open: boolean
    onRequestClose?: () => void
    selectedCourse: CourseStore

    // injected props
    auth?: Auth
}

enum Steps {
    CreateAssignment = 0,
    CreateReplyForm = 1,
    CreateAssignmentForm = 2,
    Finished = 3,
}

@inject('auth') @observer
export class AssignmentInput extends React.Component<Props> {
    readonly inputStore = new InputStore(this.props.auth)
    @observable step: Steps = Steps.CreateAssignment
    @observable assignmentId: string | null = null
    @observable iframeUrl: string | null = null

    @action.bound
    reset () {
        this.step = Steps.CreateAssignment
        this.assignmentId = null
        this.inputStore.clear()
    }

    @action.bound
    async gotoNextStep () {
        try {
            switch (this.step) {
                case Steps.CreateAssignment:
                    const result = await this.inputStore.submit(this.props.selectedCourse.course.id)
                    this.inputStore.clear()
                    this.props.selectedCourse.fetchAssignments()
                    this.assignmentId = result.id
                    this.step = Steps.CreateReplyForm
                    break

                case Steps.CreateReplyForm:
                    this.step = Steps.CreateAssignmentForm
                    break

                case Steps.CreateAssignmentForm:
                    this.step = Steps.Finished
                    break
            }
        } catch (error) {
            // TODO: show error message?
        }
    }

    @action.bound
    handleCancel () {
        this.reset()
        this.props.onRequestClose()
    }

    @action.bound
    handleFinish () {
        this.reset()
        this.props.onRequestClose()
    }

    @action.bound
    async createForm (type: 'reply' | 'assignment') {
        if (this.assignmentId == null) return
        const response = await api.post('/forms/create')
            .auth(this.props.auth.token)
            .send({
                type: 'reply',
                assignment_id: this.assignmentId
            })

        this.iframeUrl = response.body.url
    }

    render () {
        return <Dialog
                title="新增作業"
                actions={this.renderActionList()}
                modal={false}
                open={open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}>

            <Stepper activeStep={this.step}>
                <Step>
                    <StepLabel>輸入作業資訊</StepLabel>
                </Step>
                <Step>
                    <StepLabel>新增互評問卷</StepLabel>
                </Step>
                <Step>
                    <StepLabel>新增作業評鑑</StepLabel>
                </Step>
                <Step>
                    <StepLabel>完成！</StepLabel>
                </Step>
            </Stepper>

            {this.renderContent()}

            {this.iframeUrl != null ? this.renderIframe : null}

        </Dialog>
    }

    renderActionList (): React.ReactNode[] {
        if (this.step != Steps.Finished) {
            return [
                <FlatButton
                    label="取消"
                    primary={true}
                    onTouchTap={this.handleCancel}
                />,
                <FlatButton
                    label="下一步"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.gotoNextStep}
                />,
            ]
        } else {
            return [
                <FlatButton
                    label="完成"
                    primary={true}
                    onTouchTap={this.handleFinish}
                />
            ]
        }
    }

    renderContent () {
        switch (this.step) {
            case Steps.CreateAssignment:
                return <CreateAssignment inputStore={this.inputStore} />
            case Steps.CreateReplyForm:
                return <FlatButton onTouchTap={() => this.createForm('reply')}>點此新增互評問卷</FlatButton>
            case Steps.CreateAssignmentForm:
                return <FlatButton onTouchTap={() => this.createForm('assignment')}>點此新增作業評鑑</FlatButton>
            case Steps.Finished:
                return '新☆增☆大☆成☆功！！！'
            default:
                return null
        }
    }

    renderIframe () {
        return <Dialog>
            關閉前請確保您已經送出您的 Form
            <iframe className="assignment-input-iframe" src={this.iframeUrl}></iframe>
        </Dialog>
    }
}