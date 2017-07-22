import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import ContentAdd from 'material-ui/svg-icons/content/add'

import { Page } from '../Page'
import { FixedButton } from '../../FixedButton'
import { AssignmentCard } from './AssignmentCard'
import { AssignmentCardContainer } from './AssignmentCardContainer'
import { AssignmentInput } from './AssignmentInput'
import { SubmissionListController } from './SubmissionListController'

import { History } from '../../../stores/History'
import { ViewStore } from '../../../stores/ui/ViewStore'
import * as PageData from '../../../stores/ui/PageData'

export interface Props {
    history?: History
    viewStore?: ViewStore
}

@inject('history', 'viewStore')
@observer
export class AssignmentsPage extends React.Component<Props> {
    @observable dialogOpen = false

    @computed
    get pageData(): PageData.AssignmentListPage | PageData.AssignmentPage {
        const pageData = this.props.viewStore.page
        return pageData as PageData.AssignmentListPage | PageData.AssignmentPage
    }

    @action.bound
    openDialog() {
        this.dialogOpen = true
    }

    @action.bound
    closeDialog() {
        this.dialogOpen = false
    }

    @action.bound
    closeSubmissionList() {
        const { history, viewStore } = this.props
        const page = this.props.viewStore.page as PageData.AssignmentListPage
        this.props.history.push(
            `/courses/${page.selectedCourse.id}/assignments`
        )
    }

    render() {
        const { selectedCourse, showSubmissions } = this.pageData

        return (
            <Page>
                <AssignmentCardContainer>
                    {selectedCourse.assignments
                        .values()
                        .map(assignment =>
                            <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                            />
                        )}
                </AssignmentCardContainer>

                <SubmissionListController
                    open={showSubmissions}
                    onRequestClose={this.closeSubmissionList}
                />

                <FixedButton onTouchTap={this.openDialog}>
                    <ContentAdd />
                </FixedButton>

                <AssignmentInput
                    selectedCourse={selectedCourse}
                    open={this.dialogOpen}
                    onRequestClose={this.closeDialog}
                />
            </Page>
        )
    }
}
