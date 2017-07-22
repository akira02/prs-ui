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
    page: PageData.AssignmentListPage | PageData.AssignmentPage
    history?: History
}

@observer
export class AssignmentsPage extends React.Component<Props> {
    @observable dialogOpen = false

    @action.bound
    openDialog() {
        this.dialogOpen = true
    }

    @action.bound
    closeDialog() {
        this.dialogOpen = false
    }

    render() {
        const { selectedCourse, showSubmissions } = this.props.page

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

                <SubmissionListController page={this.props.page} />

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
