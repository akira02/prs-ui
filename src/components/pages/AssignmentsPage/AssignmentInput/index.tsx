import * as React from 'react'
import {observable, computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

// 元件
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Stepper, Step, StepLabel} from 'material-ui/Stepper'
import {CreateAssignment} from './CreateAssignment'
import {IframeDialog} from '../../../IframeDialog'

// store
import {Auth} from '../../../../stores/Auth'
import {Course} from '../../../../stores/Course'
import {InputStore} from './InputStore'

import {Api} from '../../../../api'

interface Props {
    /**
     * 是否顯示這個 Dialog
     * @type {boolean}
     * @memberof Props
     */
    open: boolean

    /**
     * 請求關閉這個 Dialog
     * @memberof Props
     */
    onRequestClose: () => void

    /**
     * 要新增 Assigment 的 Course
     * @type {Course}
     * @memberof Props
     */
    selectedCourse: Course

    // injected props
    api?: Api
    auth?: Auth
}

/**
 * 各個步驟, 數字對應 Stepper 裡的順序
 * @enum {number}
 */
enum Steps {
    CreateAssignment = 0,
    CreateReplyForm = 1,
    CreateAssignmentForm = 2,
    Finished = 3,
}

/**
 * 新增 Assignment 用的 Dialog
 * @export
 * @class AssignmentInput
 * @extends {React.Component<Props>}
 */
@inject('api', 'auth') @observer
export class AssignmentInput extends React.Component<Props> {
    /**
     * 用來跟第一步的表單共享資料的 store
     * @memberof AssignmentInput
     */
    readonly inputStore = new InputStore(this.props.api, this.props.auth)

    /**
     * 目前執行到的步驟
     * @type {Steps}
     * @memberof AssignmentInput
     */
    @observable step: Steps = Steps.CreateAssignment

    /**
     * 第一步新增好的 assignment 的 id
     * @type {(string | null)}
     * @memberof AssignmentInput
     */
    @observable assignmentId: string | null = null

    /**
     * 彈出式 iframe 的 url
     * @type {(string | null)}
     * @memberof AssignmentInput
     */
    @observable iframeUrl: string | null = null

    /**
     * 重設到初始狀態
     * @memberof AssignmentInput
     */
    @action.bound
    reset () {
        this.step = Steps.CreateAssignment
        this.assignmentId = null
        this.inputStore.clear()
    }

    /**
     * 進下一步
     * @memberof AssignmentInput
     */
    @action.bound
    async gotoNextStep () {
        try {
            switch (this.step) {
                case Steps.CreateAssignment:
                    const result = await this.inputStore.submit(this.props.selectedCourse.id)
                    this.assignmentId = result.id
                    this.step = Steps.CreateReplyForm
                    
                    // 順便更新一下 assignment 列表
                    this.props.selectedCourse.fetchAssignments()
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

    /**
     * 取消這次新增
     * @memberof AssignmentInput
     */
    @action.bound
    handleCancel () {
        // TODO: 把第一步新增的 assignment 刪掉？
        this.reset()
        this.props.onRequestClose()
    }

    /**
     * 完成新增
     * @memberof AssignmentInput
     */
    @action.bound
    handleFinish () {
        this.reset()
        this.props.onRequestClose()
    }

    @action.bound
    async createForm (type: 'reply' | 'assignment') {
        if (this.assignmentId == null) return
        const response = await this.props.api.post('forms/create')
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
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}>
            {this.renderSteps()}
            {this.renderContent()}
    
            <IframeDialog
                    open={this.iframeUrl != null}
                    src={this.iframeUrl}
                    onRequestClose={() => this.iframeUrl = null}>
                <p>請記得在關閉前先送出您的問卷</p>
            </IframeDialog>
        </Dialog>
    }

    /**
     * 繪製 Dialog 的按鈕列表
     * @returns {React.ReactNode[]} 
     * @memberof AssignmentInput
     */
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

    /**
     * 繪製步驟指示
     * @returns 
     * @memberof AssignmentInput
     */
    renderSteps () {
        return <Stepper activeStep={this.step}>
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
    }

    /**
     * 根據目前步驟繪製不同內容
     * @returns 
     * @memberof AssignmentInput
     */
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
}