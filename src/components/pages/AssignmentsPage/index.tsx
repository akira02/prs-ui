import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'

import ContentAdd from 'material-ui/svg-icons/content/add'

import { Page } from '../Page'
import { FixedButton } from '../../FixedButton'
import { AssignmentCard } from './AssignmentCard'
import { AssignmentCardContainer } from './AssignmentCardContainer'
import { AssignmentInput } from './AssignmentInput'
import { SubmissionListController } from './SubmissionListController'

import * as PageData from '../../../stores/ui/PageData'

export interface Props {
    page: PageData.CoursePage<PageData.AssignmentListPage>
    history?: History
}

@observer
export class AssignmentsPage extends React.Component<Props> {
    @observable assignmentInputOpen = false

    @action.bound
    showAssignmentInput() {
        this.assignmentInputOpen = true
    }

    @action.bound
    hideAssignmentInput() {
        this.assignmentInputOpen = false
    }

    render() {
        const { selectedCourse, subPage } = this.props.page

        return (
            <Page
                style={{
                    backgroundImage: 'url(/static/pic/assignment-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}
            >
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

                <SubmissionListController page={this.props.page} />

                <FixedButton onTouchTap={this.showAssignmentInput}>
                    <ContentAdd />
                </FixedButton>

                <AssignmentInput
                    selectedCourse={selectedCourse}
                    open={this.assignmentInputOpen}
                    onRequestClose={this.hideAssignmentInput}
                />
            </Page>
        )
    }
}
