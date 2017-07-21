import * as React from 'react'
import {injectGlobal} from 'styled-components'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import ContentAdd from 'material-ui/svg-icons/content/add'

import { CSSTransitionGroup } from 'react-transition-group'

import { Page } from '../Page'
import { FixedButton } from '../../FixedButton'
import { AssignmentCard } from './AssignmentCard'
import { AssignmentCardContainer } from './AssignmentCardContainer'
import { AssignmentInput } from './AssignmentInput'
import { SubmissionList } from './SubmissionList'
import { SubmissionListBackground } from './SubmissionListBackground'

import {History} from '../../../stores/History'
import {ViewStore} from '../../../stores/ui/ViewStore'
import * as PageData from '../../../stores/ui/PageData'

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
        const page = this.props.viewStore.page as PageData.AssignmentListPage
        this.props.history.push(`/courses/${page.selectedCourse.id}/assignments`)
    }

    render () {
        const {viewStore} = this.props
        const {selectedCourse, showSubmissions} = viewStore.page as PageData.AssignmentListPage
        
        return <Page>
            <AssignmentCardContainer>
                {
                    selectedCourse.assignments.values().map(assignment =>
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                    )
                }
            </AssignmentCardContainer>

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

            <FixedButton onTouchTap={this.openDialog}>
                <ContentAdd />
            </FixedButton>

            <AssignmentInput
                selectedCourse={selectedCourse}
                open={this.dialogOpen}
                onRequestClose={this.closeDialog} />
        </Page>
    }

    renderSubmissionListBackground () {
        return <SubmissionListBackground
            key="submission-list-background"
            onClick={this.closeSubmissionList} />
    }

    renderSubmissionList () {
        const {viewStore} = this.props
        const {selectedAssignment} = viewStore.page as PageData.AssignmentPage
        
        return <SubmissionList
            key="submission-list"
            selectedAssignment={selectedAssignment} />
    }
}

injectGlobal`
.submission-list-enter {
    transform: translateX(100%);
}
.submission-list-enter.submission-list-enter-active {
    transform: translateX(0);
    transition: transform .5s ease-out;
}
.submission-list-leave {
    transform: translateX(0);
}
.submission-list-leave.submission-list-leave-active {
    transform: translateX(100%);
    transition: transform .5s ease-out;
}
`

injectGlobal`
.submission-list-background-enter {
    opacity: 0;
}
.submission-list-background-enter.submission-list-background-enter-active {
    opacity: 1;
    transition: opacity .5s ease-out;
}
.submission-list-background-leave {
    opacity: 1;
}
.submission-list-background-leave.submission-list-background-leave-active {
    opacity: 0;
    transition: opacity .5s ease-out;
}
`