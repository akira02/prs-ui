import * as React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { CSSTransitionGroup } from 'react-transition-group'

import { Page } from '../Page'
import { AssignmentCard } from './AssignmentCard'
import { AssignmentInput } from './AssignmentInput'
import { SubmissionList } from './SubmissionList'

import {History} from '../../../stores/History'
import {ViewStore} from '../../../stores/ui/ViewStore'
import * as PageStore from '../../../stores/ui/PageStore'

import './style.css'

export interface Props {
    history?: History
    viewStore?: ViewStore
}

@inject('history', 'viewStore') @observer
export class AssignmentsPage extends React.Component<Props> {
    @observable dialogOpen = false

    @action.bound
    openDialog () {
        this.dialogOpen = true
    }

    @action.bound
    closeDialog () {
        this.dialogOpen = false
    }

    @action.bound
    closeSubmissionList () {
        const {history, viewStore} = this.props
        const page = this.props.viewStore.page as PageStore.AssignmentList
        this.props.history.push(`/courses/${page.courseId}/assignments`)
    }

    render () {
        const {viewStore} = this.props
        const {selectedCourse, showSubmissions} = viewStore.page as PageStore.AssignmentList
        
        return <Page>
            <div className="assignment-card-container">
                {
                    selectedCourse.assignmentStores.values().map(store =>
                        <AssignmentCard key={store.assignment.id} store={store} />
                    )
                }
            </div>

            <CSSTransitionGroup
                transitionName="submission-list-background"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500} >

                {showSubmissions ? this.renderSubmissionListBackground() : null}
            </CSSTransitionGroup>
            
            <CSSTransitionGroup
                transitionName="submission-list"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500} >

                {showSubmissions ? this.renderSubmissionList() : null}
            </CSSTransitionGroup>

            <FloatingActionButton className="button-fixed" onTouchTap={this.openDialog}>
                <ContentAdd />
            </FloatingActionButton>

            <AssignmentInput
                selectedCourse={selectedCourse}
                open={this.dialogOpen}
                onRequestClose={this.closeDialog} />
        </Page>
    }

    renderSubmissionListBackground () {
        return <div
            key="submission-list-background"
            className="submission-list-background"
            onClick={this.closeSubmissionList} />
    }

    renderSubmissionList () {
        const {viewStore} = this.props
        const {selectedAssignment} = viewStore.page as PageStore.Assignment
        
        return <SubmissionList
            key="submission-list"
            selectedAssignment={selectedAssignment} />
    }
}